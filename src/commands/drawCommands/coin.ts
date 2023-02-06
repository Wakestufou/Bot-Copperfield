import {
    APIAttachment,
    Attachment,
    AttachmentBuilder,
    AttachmentPayload,
    BufferResolvable,
    CommandInteraction,
    CommandInteractionOptionResolver,
    JSONEncodable,
} from 'discord.js';
import Logger from '../../utils/Logger';
import wait from 'node:timers/promises';
import { Stream } from 'node:stream';

export default async (
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver
) => {
    const number = args.getInteger('number') ?? 1;

    if (number < 1 || number > 10) {
        interaction
            .followUp({
                content:
                    '```css\n[ Le nombre de pièces doit être compris entre 1 et 10 ]```',
            })
            .catch((error) => {
                Logger.error(
                    'Error while replying to interaction for draw command (coin): ',
                    error
                );
            });

        return;
    }

    let results = '';
    const coinFiles = [] as (
        | BufferResolvable
        | Stream
        | JSONEncodable<APIAttachment>
        | Attachment
        | AttachmentBuilder
        | AttachmentPayload
    )[];

    for (let i = 0; i < number; i++) {
        const result = Math.floor(Math.random() * 2) === 0 ? 'Pile' : 'Face';
        results += `${result} | `;
        coinFiles.push({
            attachment: `${__dirname}/../../../assets/coin/${result}.png`,
            name: `${result}.png`,
        });
    }

    interaction
        .followUp({ content: `Le résultat du tirage est :\n...` })
        .then(async () => {
            return wait.setTimeout(1000);
        })
        .then(() => {
            return interaction.editReply({
                content: `Le résultat du tirage est :\n...\n...`,
            });
        })
        .then(async () => {
            return wait.setTimeout(1000);
        })
        .then(() => {
            return interaction.editReply({
                content: `Le résultat du tirage est :\n...\n...\n...`,
            });
        })
        .then(async () => {
            return wait.setTimeout(1000);
        })
        .then(() => {
            return interaction.editReply({
                content: `Le résultat du tirage est : ${results}`,
                files: coinFiles,
            });
        })
        .catch((error) => {
            Logger.error(
                'Error while replying to interaction for draw command (coin): ',
                error
            );
        });

    return;
};
