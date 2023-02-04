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
    const deck = args.getString('deck', true);
    let cards = [] as string[];
    if (deck === '52') {
        cards = [
            'Ac',
            '2c',
            '3c',
            '4c',
            '5c',
            '6c',
            '7c',
            '8c',
            '9c',
            '10c',
            'Jc',
            'Qc',
            'Kc',
            'Ad',
            '2d',
            '3d',
            '4d',
            '5d',
            '6d',
            '7d',
            '8d',
            '9d',
            '10d',
            'Jd',
            'Qd',
            'Kd',
            'Ah',
            '2h',
            '3h',
            '4h',
            '5h',
            '6h',
            '7h',
            '8h',
            '9h',
            '10h',
            'Jh',
            'Qh',
            'Kh',
            'As',
            '2s',
            '3s',
            '4s',
            '5s',
            '6s',
            '7s',
            '8s',
            '9s',
            '10s',
            'Js',
            'Qs',
            'Ks',
            'Joker',
        ];
    }

    if (deck === '32') {
        cards = [
            'Ac',
            '7c',
            '8c',
            '9c',
            '10c',
            'Jc',
            'Qc',
            'Kc',
            'Ad',
            '7d',
            '8d',
            '9d',
            '10d',
            'Jd',
            'Qd',
            'Kd',
            'Ah',
            '7h',
            '8h',
            '9h',
            '10h',
            'Jh',
            'Qh',
            'Kh',
            'As',
            '7s',
            '8s',
            '9s',
            '10s',
            'Js',
            'Qs',
            'Ks',
        ];
    }

    let card = cards[Math.floor(Math.random() * cards.length)];

    if (card[card.length - 1] === 'c') {
        card = card.slice(0, -1) + '♣';
    } else if (card[card.length - 1] === 'd') {
        card = card.slice(0, -1) + '♦';
    } else if (card[card.length - 1] === 'h') {
        card = card.slice(0, -1) + '♥';
    } else if (card[card.length - 1] === 's') {
        card = card.slice(0, -1) + '♠';
    }

    interaction
        .followUp({
            content: `La carte tirée est :\n...`,
        })
        .then(async () => {
            return wait.setTimeout(1000);
        })
        .then(() => {
            return interaction.editReply({
                content: `La carte tirée est :\n...\n...`,
            });
        })
        .then(async () => {
            return wait.setTimeout(1000);
        })
        .then(() => {
            return interaction.editReply({
                content: `La carte tirée est :\n...\n...\n...`,
            });
        })
        .then(async () => {
            return wait.setTimeout(1000);
        })
        .then(() => {
            return interaction.editReply({
                content: `La carte tirée est : ${card}`,
            });
        })
        .catch((error) => {
            Logger.error(
                'Error while replying to interaction for draw command (52 cards): ',
                error
            );
        });

    return;
};
