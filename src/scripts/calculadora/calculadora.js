function calculatePenalties(values, minimumPenalties) {
    const penalties = {
        illegalTools: {
            minimum: minimumPenalties.illegalTools,
            additional: values.illegalTools * 10,
            total: minimumPenalties.illegalTools + values.illegalTools * 10
        },
        drugTrafficking: {
            minimum: minimumPenalties.drugTrafficking,
            additional: values.drugTrafficking / 2,
            total: minimumPenalties.drugTrafficking + values.drugTrafficking / 2
        },
        illegalAmmunition: {
            minimum: minimumPenalties.illegalAmmunition,
            additional: (values.illegalAmmunition / 20) * 5,
            total: minimumPenalties.illegalAmmunition + (values.illegalAmmunition / 20) * 5
        },
        illegalMoney: {
            minimum: minimumPenalties.illegalMoney,
            additional: values.illegalMoney / 1000,
            total: minimumPenalties.illegalMoney + values.illegalMoney / 1000
        },
        stolenProducts: {
            minimum: minimumPenalties.stolenProducts,
            additional: values.stolenProducts * 2,
            total: minimumPenalties.stolenProducts + values.stolenProducts * 2
        },
        pendingFines: {
            minimum: minimumPenalties.pendingFines,
            additional: values.pendingFines / 1000,
            total: minimumPenalties.pendingFines + values.pendingFines / 1000
        }
    };

    return penalties;
}

function getPenaltyLabel(key) {
    const labels = {
        illegalTools: 'Posse de Ferramentas Ilícitas',
        drugTrafficking: 'Tráfico de Entorpecentes',
        illegalAmmunition: 'Posse de Munição Ilegal',
        illegalMoney: 'Posse de Dinheiro Ilícito',
        stolenProducts: 'Receptação de Produtos Roubados',
        pendingFines: 'Multas Pendentes'
    };
    return labels[key] || key;
}