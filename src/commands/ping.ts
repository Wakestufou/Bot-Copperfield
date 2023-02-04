import { Command } from '../structures/Command';
import { PermissionFlagsBits } from 'discord.js';

export default new Command({
    name: 'ping',
    description: 'Replies with Pong !',
    default_member_permissions: String(PermissionFlagsBits.Administrator),
    run: async ({ interaction }) => {
        const sent = await interaction.reply({
            content: 'Pinging...',
            fetchReply: true,
        });
        await interaction.editReply(
            `Roundtrip latency: ${
                sent.createdTimestamp - interaction.createdTimestamp
            }ms`
        );
    },
});
