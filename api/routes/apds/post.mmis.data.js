import { forAllYears, APD_TYPE } from '@cms-eapd/common';

const getNewMmisApd = (years, yearOptions) => {
  const regsGenerator = () => ({
    procurement: [
      { title: 'SMM, Part 11', checked: null, explanation: '' },
      { title: '45 CFR Part 95.615', checked: null, explanation: '' },
      { title: '45 CFR Part 92.36', checked: null, explanation: '' }
    ],
    recordsAccess: [
      {
        title: '42 CFR Part 433.112(b)(5)-(9)',
        checked: null,
        explanation: ''
      },
      { title: '45 CFR Part 95.615', checked: null, explanation: '' },
      { title: 'SMM Section 11267', checked: null, explanation: '' }
    ],
    softwareRights: [
      { title: '45 CFR Part 95.617', checked: null, explanation: '' },
      { title: '42 CFR Part 431.300', checked: null, explanation: '' },
      { title: '45 CFR Part 164', checked: null, explanation: '' }
    ],
    independentVV: [
      {
        title: '45 CFR Part 95.626',
        checked: null,
        explanation: ''
      }
    ]
  });

  return {
    apdType: APD_TYPE.MMIS,
    name: 'MMIS IAPD',
    apdOverview: {},
    statePrioritiesAndScope: {
      medicaidProgramAndPriorities: '',
      mesIntroduction: '',
      scopeOfAPD: ''
    },
    previousActivities: {
      previousActivitySummary: '',
      actualExpenditures: forAllYears(
        {
          mmis: {
            90: { federalActual: 0, totalApproved: 0 },
            75: { federalActual: 0, totalApproved: 0 },
            50: { federalActual: 0, totalApproved: 0 }
          }
        },
        [0, 1, 2].map(past => yearOptions[0] - past)
      )
    },
    activities: [],
    securityPlanning: {
      securityAndInterfacePlan: '',
      businessContinuityAndDisasterRecovery: ''
    },
    assurancesAndCompliances: regsGenerator()
  };
};

export default getNewMmisApd;
