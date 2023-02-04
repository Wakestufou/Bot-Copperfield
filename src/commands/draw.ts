import { Command } from '../structures/Command';
import Logger from '../utils/Logger';

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
            description: 'Tirage au sort de dés',
            options: [
                {
                    type: 4,
                    name: 'number',
                    description: 'Nombre de dés',
                },
                {
                    type: 4,
                    name: 'faces',
                    description: 'Nombre de faces',
                },
            ],
        },
        {
            type: 1,
            name: 'coin',
            description: 'Tirage au sort de pièces',
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
        const subCommand = args.getSubcommand();

        if (subCommand === 'card') {
            const deck = args.getString('deck', true);
            if (deck === '52') {
                const card = Math.floor(Math.random() * 52) + 1;
                interaction
                    .reply(`La carte tirée est la ${card}`)
                    .catch((error) => {
                        Logger.error(
                            'Error while replying to interaction for draw command (52 cards): ',
                            error
                        );
                    });

                return;
            }

            if (deck === '32') {
                const cards = ['A', '7', '8', '9', '10', 'J', 'Q', 'K'];
                const color = ['♠', '♣', '♥', '♦'];

                const card = cards[Math.floor(Math.random() * cards.length)];
                const colorCard =
                    color[Math.floor(Math.random() * color.length)];

                interaction
                    .reply(`La carte tirée est le ${card}${colorCard}`)
                    .catch((error) => {
                        Logger.error(
                            'Error while replying to interaction for draw command (32 cards): ',
                            error
                        );
                    });

                return;
            }
        }

        if (subCommand === 'dice') {
            const number = args.getInteger('number') ?? 1;
            const faces = args.getInteger('faces') ?? 6;

            if (number < 1 || number > 100) {
                interaction
                    .reply('Le nombre de dés doit être compris entre 1 et 100')
                    .catch((error) => {
                        Logger.error(
                            'Error while replying to interaction for draw command (dice): ',
                            error
                        );
                    });

                return;
            }

            if (faces < 1 || faces > 100) {
                interaction
                    .reply(
                        'Le nombre de faces doit être compris entre 1 et 100'
                    )
                    .catch((error) => {
                        Logger.error(
                            'Error while replying to interaction for draw command (dice): ',
                            error
                        );
                    });

                return;
            }

            let result = '';

            for (let i = 0; i < number; i++) {
                result += `${Math.floor(Math.random() * faces) + 1} `;
            }

            interaction
                .reply(`Le résultat du tirage est ${result}`)
                .catch((error) => {
                    Logger.error(
                        'Error while replying to interaction for draw command (dice): ',
                        error
                    );
                });

            return;
        }

        if (subCommand === 'coin') {
            const number = args.getNumber('number') ?? 1;

            if (number < 1 || number > 100) {
                interaction
                    .reply(
                        'Le nombre de pièces doit être compris entre 1 et 100'
                    )
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
                result += `${
                    Math.floor(Math.random() * 2) === 0 ? 'Pile' : 'Face'
                } `;
            }

            interaction
                .reply(`Le résultat du tirage est ${result}`)
                .catch((error) => {
                    Logger.error(
                        'Error while replying to interaction for draw command (coin): ',
                        error
                    );
                });

            return;
        }
    },
});
