/* function calculatePenalties(values) {
    const illegalToolsPenalty = values.illegalTools * 10;
    const drugTraffickingPenalty = values.drugTrafficking / 2;
    const illegalAmmunitionPenalty = (values.illegalAmmunition / 20) * 5;
    const illegalMoneyPenalty = values.illegalMoney / 1000;
    const pendingFinesPenalty = values.pendingFines / 1000;

    const totalPenalty = 
        illegalToolsPenalty +
        drugTraffickingPenalty +
        illegalAmmunitionPenalty +
        illegalMoneyPenalty +
        pendingFinesPenalty;

    return {
        illegalToolsPenalty,
        drugTraffickingPenalty,
        illegalAmmunitionPenalty,
        illegalMoneyPenalty,
        pendingFinesPenalty,
        totalPenalty
    };
} */

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
        pendingFines: 'Multas Pendentes'
    };
    return labels[key] || key;
}