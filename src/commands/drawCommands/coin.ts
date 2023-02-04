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

    if (number < 1 || number > 100) {
        interaction
            .followUp({
                content:
                    '```css\n[ Le nombre de pièces doit être compris entre 1 et 100 ]```',
            })
            .catch((error) => {
                Logger.error(
                    'Error while replying to interaction for draw command (coin): ',
                    error
                );
            });

        return;
    }

    let result = '';

    for (let i = 0; i < number; i++) {
        result += `${Math.floor(Math.random() * 2) === 0 ? 'Pile' : 'Face'} `;
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
                'Error while replying to interaction for draw command (coin): ',
                error
            );
        });

    return;
};
