import {
    CommandInteraction,
    CommandInteractionOptionResolver,
} from 'discord.js';
import Logger from '../../utils/Logger';
import wait from 'node:timers/promises';

export default async (
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver
) => {
    const number = args.getInteger('number') ?? 1;
    const faces = [0, 1, 1, 2, 2, 3];

    if (number < 1 || number > 30) {
        interaction
            .followUp({
                content:
                    '```css\n[ Le nombre de dés doit être compris entre 1 et 30 ]```',
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

    for (let i = 0; i < number; i++) {
        result += faces[Math.floor(Math.random() * faces.length)];
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
