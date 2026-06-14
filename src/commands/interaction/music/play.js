const { EmbedBuilder, MessageFlags } = require("discord.js");
const { convertTime } = require("../../../functions/timeFormat.js");

module.exports = {
    name: "play",
    description: "Play a song",
    category: "music",
    options: [
        {
            name: "query",
            description: "Provide a song name or url",
            type: 3,
            required: true,
        },
    ],
    permissions: {
        bot: ["Speak", "Connect"],
        user: ["Speak", "Connect"],
    },
    settings: {
        voice: true,
        player: false,
        current: false,
    },

    run: async (client, interaction, player) => {

        const embed = new EmbedBuilder().setColor(client.config.embedColor);

        if (player && player.voiceId !== interaction.member.voice.channelId) {
            embed.setDescription("You must be in the same voice channel as the bot.");
            return interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        }

        await interaction.deferReply();

        const query = interaction.options.getString("query");

        console.log("SEARCH:", query);

        let result;

        try {
            result = await client.rainlink.search(query, {
                requester: interaction.member
            });

            console.log(result);
        } catch (err) {
            console.error("SEARCH ERROR:", err);

            embed.setDescription("❌ Search failed.");

            return interaction.editReply({
                embeds: [embed]
            });
        }

        if (
            !result ||
            result.type === "EMPTY" ||
            result.type === "ERROR" ||
            !result.tracks ||
            !result.tracks.length
        ) {
            embed.setDescription("❌ No results found.");

            return interaction.editReply({
                embeds: [embed]
            });
        }

        if (!player) {
            player = await client.rainlink.create({
                guildId: interaction.guild.id,
                textId: interaction.channel.id,
                voiceId: interaction.member.voice.channel.id,
                shardId: interaction.guild.shardId,
                volume: client.config.defaultVolume,
                deaf: true
            });
        }

        if (result.type === "PLAYLIST") {

            for (const track of result.tracks)
                player.queue.add(track);

            embed.setDescription(
                `Added **${result.playlistName}** (${result.tracks.length} songs)`
            );

        } else {

            const track = result.tracks[0];

            player.queue.add(track);

            embed.setDescription(
                `Added **${track.title}** - \`${convertTime(track.duration)}\``
            );

        }

        await interaction.editReply({
            embeds: [embed]
        });

        if (!player.playing) {
            try {
                await player.play();
            } catch (err) {
                console.error("PLAYER ERROR:", err);
            }
        }
    }
};
