import { Color } from '../utils/Colors';
import { Event } from '../structures/Event';
import Logger from '../utils/Logger';
import { ActivityType } from 'discord.js';

export default new Event('ready', (client) => {
    Logger.info('Bot is online ! ' + client.user?.tag, 'READY', Color.FgGreen);

    // Set the client user's presence
    client.user.setPresence({
        activities: [
            {
                name: 'vous connaissez ffxiv ???',
                type: ActivityType.Streaming,
                url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
            },
        ],
        status: 'online',
    });
});
