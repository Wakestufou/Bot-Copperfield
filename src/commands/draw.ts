import { Command } from '../structures/Command';
import drawCards from './drawCommands/card';
import drawDice from './drawCommands/dice';
import drawCoin from './drawCommands/coin';

export default new Command({
    name: 'draw',
    description: 'Tirage au sort',
    options: [
        {
            type: 1,
            name: 'card',
            description: 'Tirage au sort de cartes',
            options: [
                {
                    type: 3,
                    name: 'deck',
                    description: 'Choix du jeu de cartes',
                    required: true,
                    choices: [
                        {
                            name: '52 cartes',
                            value: '52',
                        },
                        {
                            name: '32 cartes',
                            value: '32',
                        },
                    ],
                },
            ],
        },
        {
            type: 1,
            name: 'dice',
            description:
                'Tirage au sort de dés | 1 face à 0, 2 faces à 1, 2 faces à 2, 1 face à 3',
            options: [
                {
                    type: 4,
                    name: 'number',
                    description: 'Nombre de dés',
                },
            ],
        },
        {
            type: 1,
            name: 'coin',
            description: 'Tirage au sort de pièces | 1 pièce par défaut',
            options: [
                {
                    type: 4,
                    name: 'number',
                    description: 'Nombre de pièces',
                },
            ],
        },
    ],
    run: async ({ interaction, args }) => {
        await interaction.deferReply();
        const subCommand = args.getSubcommand();

        if (subCommand === 'card') {
            drawCards(interaction, args);
            return;
        }

        if (subCommand === 'dice') {
            drawDice(interaction, args);
            return;
        }

        if (subCommand === 'coin') {
            drawCoin(interaction, args);
            return;
        }
    },
});
