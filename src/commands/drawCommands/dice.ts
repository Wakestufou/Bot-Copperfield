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
    const faces = [0, 1, 1, 2, 2, 3];

    if (number < 1 || number > 10) {
        interaction
            .followUp({
                content:
                    '```css\n[ Le nombre de dés doit être compris entre 1 et 10 ]```',
            })
            .catch((error) => {
                Logger.error(
                    'Error while replying to interaction for draw command (dice): ',
                    error
                );
            });

        return;
    }

    let result = 0;
    const diceFiles = [] as (
        | BufferResolvable
        | Stream
        | JSONEncodable<APIAttachment>
        | Attachment
        | AttachmentBuilder
        | AttachmentPayload
    )[];

    for (let i = 0; i < number; i++) {
        const face = faces[Math.floor(Math.random() * faces.length)];
        result += face;
        diceFiles.push({
            attachment: `${__dirname}/../../../assets/dice/${face}.png`,
            name: `${face}.png`,
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
                content: `Le résultat du tirage est : ${result}`,
                files: diceFiles,
            });
        })
        .catch((error) => {
            Logger.error(
                'Error while replying to interaction for draw command (dice): ',
                error
            );
        });

    return;
};
