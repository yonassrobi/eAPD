import { APD_TYPE, FUNDING_CATEGORY_TYPE } from '@cms-eapd/common';

export default {
  _id: '62a76c4210a0f01aaa737873',
  status: 'draft',
  stateId: 'ak',
  apdType: APD_TYPE.HITECH,
  name: 'HITECH IAPD Dio 2',
  years: ['2022', '2023'],
  yearOptions: ['2022', '2023', '2024'],
  apdOverview: {
    updateStatus: {
      isUpdateAPD: false,
      annualUpdate: false,
      asNeededUpdate: false
    },
    narrativeHIE:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac auctor augue mauris augue neque gravida in. Ipsum a arcu cursus vitae. Scelerisque eu ultrices vitae auctor.</p>',
    narrativeHIT:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et netus et malesuada fames ac. Bibendum at varius vel pharetra vel turpis. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt.</p>',
    narrativeMMIS:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum eu facilisis sed odio morbi quis commodo odio aenean. Facilisis volutpat est velit egestas dui id ornare. Fermentum dui faucibus in ornare quam viverra orci sagittis eu.</p>',
    programOverview:
      '<p><span style="font-weight:400">APD 2; This APD has missing fields for Admin check, the missing fields are in the State Expenses and Other Funding of the First activity.</span></p>\n<ul>\n<li><span style="font-weight:400">FFY 2022-2023</span></li>\n<li><span style="font-weight:400">2 Key State Personnel</span></li>\n<li><span style="font-weight:400">3 Activities</span></li>\n<ul>\n<li><span style="font-weight:400">Activity 1</span></li>\n<ul>\n<li><span style="font-weight:400">Funding Source: HIT</span></li>\n<li><span style="font-weight:400">Standards and Conditions</span></li>\n<li><span style="font-weight:400">1 Outcome</span></li>\n<ul>\n<li><span style="font-weight:400">1 Metric</span></li>\n</ul>\n<li><span style="font-weight:400">1 Milestone</span></li>\n<li><span style="font-weight:400">1 State Staff</span></li>\n<li><span style="font-weight:400">3 State Expenses</span></li>\n<li><span style="font-weight:400">1 Private Contractor Costs</span></li>\n<li><span style="font-weight:400">Include other funding</span></li>\n</ul>\n<li><span style="font-weight:400">Activity 2</span></li>\n<ul>\n<li><span style="font-weight:400">Funding Source: HIE</span></li>\n<li><span style="font-weight:400">1 Outcome</span></li>\n<li><span style="font-weight:400">1 Milestone</span></li>\n<li><span style="font-weight:400">1 State Staff</span></li>\n<li><span style="font-weight:400">2 State Expenses</span></li>\n<li><span style="font-weight:400">1 Private Contractor Costs</span></li>\n<li><span style="font-weight:400">Include other funding</span></li>\n</ul>\n<li><span style="font-weight:400">Activity 3</span></li>\n<ul>\n<li><span style="font-weight:400">Funding Source: HIT</span></li>\n<li><span style="font-weight:400">2 Outcome</span></li>\n<li><span style="font-weight:400">1 Milestone</span></li>\n<li><span style="font-weight:400">1 State Staff</span></li>\n<li><span style="font-weight:400">1 State Expenses</span></li>\n<li><span style="font-weight:400">1 Private Contractor Costs</span></li>\n<li><span style="font-weight:400">Include other funding</span></li>\n</ul>\n</ul>\n</ul>'
  },
  previousActivities: {
    previousActivitySummary:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc congue nisi vitae suscipit tellus mauris a diam. Diam quam nulla porttitor massa id neque aliquam. Orci nulla pellentesque dignissim enim sit amet. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Mauris sit amet massa vitae tortor. Enim facilisis gravida neque convallis a cras semper.</p>',
    actualExpenditures: {
      2020: {
        hithie: {
          federalActual: 0,
          totalApproved: 650000
        },
        mmis: {
          50: {
            federalActual: 0,
            totalApproved: 120000
          },
          75: {
            federalActual: 0,
            totalApproved: 359000
          },
          90: {
            federalActual: 0,
            totalApproved: 783000
          }
        }
      },
      2021: {
        hithie: {
          federalActual: 0,
          totalApproved: 650000
        },
        mmis: {
          50: {
            federalActual: 0,
            totalApproved: 287000
          },
          75: {
            federalActual: 0,
            totalApproved: 410000
          },
          90: {
            federalActual: 0,
            totalApproved: 190000
          }
        }
      },
      2022: {
        hithie: {
          federalActual: 0,
          totalApproved: 650000
        },
        mmis: {
          50: {
            federalActual: 0,
            totalApproved: 310000
          },
          75: {
            federalActual: 0,
            totalApproved: 410000
          },
          90: {
            federalActual: 0,
            totalApproved: 220000
          }
        }
      }
    }
  },
  keyStatePersonnel: {
    medicaidDirector: {
      email: 'c.fudge@ministry.magic',
      name: 'Cornelius Fudge',
      phone: '5551234567'
    },
    medicaidOffice: {
      address1: '100 Round Sq',
      address2: '',
      city: 'Cityville',
      state: 'AK',
      zip: '12345'
    },
    keyPersonnel: [
      {
        name: 'Billy B',
        position: 'Lead Manager',
        email: 'sample@testing.com',
        isPrimary: true,
        fte: {
          2022: 0,
          2023: 0
        },
        hasCosts: false,
        costs: {
          2022: 0,
          2023: 0
        },
        split: {
          2022: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          2023: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          }
        },
        medicaidShare: {
          2022: 100,
          2023: 100
        }
      },
      {
        name: 'chase M',
        position: 'Prince of Fortitude',
        email: 'ChaseM@sample.co',
        isPrimary: false,
        fte: {
          2022: 4,
          2023: 4
        },
        hasCosts: true,
        costs: {
          2022: 129044,
          2023: 178440
        },
        split: {
          2022: {
            federal: 75,
            state: 25,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          },
          2023: {
            federal: 75,
            state: 25,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          }
        },
        medicaidShare: {
          2022: 100,
          2023: 100
        }
      }
    ]
  },
  activities: [
    {
      fundingSource: 'HIT',
      name: 'Program Administration',
      activityOverview: {
        summary:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Nec tincidunt praesent semper feugiat nibh sed.</p>',
        description:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu non odio euismod lacinia at. Cursus in hac habitasse platea dictumst quisque sagittis purus sit.</p>',
        alternatives:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum posuere urna nec tincidunt. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. In est ante in nibh mauris cursus mattis.</p>',
        standardsAndConditions: {
          doesNotSupport: '',
          supports:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget velit aliquet sagittis id consectetur purus ut faucibus. Tristique risus nec feugiat in. Sed odio morbi quis commodo. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci.</p>'
        }
      },
      activitySchedule: {
        plannedStartDate: '2020-01-15T05:00:00.000+0000',
        plannedEndDate: '2022-01-19T05:00:00.000+0000'
      },
      milestones: [
        {
          milestone: 'milestone 1',
          endDate: '2022-07-08T00:00:00.000+0000'
        }
      ],
      outcomes: [
        {
          outcome:
            'Outcome of this APD is for easier access to virtual doctors visits',
          metrics: [
            {
              metric:
                'When over 60% of the population is registered with health insurance that offers virtual doctors visit'
            }
          ]
        }
      ],
      statePersonnel: [
        {
          title: 'Caesar of Blue',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat velit scelerisque in dictum non consectetur a. Ultricies tristique nulla aliquet enim. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Elit eget gravida cum sociis natoque penatibus et.',
          years: {
            2022: {
              amt: 78000,
              perc: 3
            },
            2023: {
              amt: 163000,
              perc: 4
            }
          }
        }
      ],
      expenses: [
        {
          category: 'Hardware, software, and licensing',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          years: {
            2022: 34000,
            2023: 42000
          }
        },
        {
          category: 'Hardware, software, and licensing',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          years: {
            2022: 1200,
            2023: 8500
          }
        },
        {
          category: 'Equipment and supplies',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          years: {
            2022: 800,
            2023: 1600
          }
        }
      ],
      contractorResources: [
        {
          name: 'Paragon of Ships',
          description:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
          start: '2020-09-09T00:00:00.000+0000',
          end: '2022-11-12T00:00:00.000+0000',
          totalCost: 340000,
          years: {
            2022: 140000,
            2023: 200000
          },
          useHourly: false,
          hourly: {
            2022: {
              hours: null,
              rate: null
            },
            2023: {
              hours: null,
              rate: null
            }
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          other: 240000
        },
        2023: {
          ffp: {
            federal: 50,
            state: 50,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          },
          other: 220000
        }
      },
      costAllocationNarrative: {
        methodology:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae turpis massa sed elementum tempus. Augue lacus viverra vitae congue eu consequat ac felis. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Non enim praesent elementum facilisis leo vel fringilla est. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Dignissim diam quis enim lobortis scelerisque. Tortor aliquam nulla facilisi cras fermentum odio. Tristique sollicitudin nibh sit amet commodo nulla facilisi. Urna molestie at elementum eu facilisis sed. Sit amet aliquam id diam maecenas ultricies mi eget mauris. Ut diam quam nulla porttitor massa id. Ac tortor vitae purus faucibus ornare. Justo laoreet sit amet cursus sit amet dictum sit. Lectus proin nibh nisl condimentum id venenatis a condimentum. Amet massa vitae tortor condimentum lacinia quis vel. Pharetra massa massa ultricies mi. Posuere urna nec tincidunt praesent semper. Etiam sit amet nisl purus in mollis nunc sed.</p>',
        years: {
          2022: {
            otherSources:
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut consequat semper viverra nam. Vel pretium lectus quam id. Purus sit amet luctus venenatis lectus magna. Ultricies tristique nulla aliquet enim tortor. A scelerisque purus semper eget. Justo nec ultrices dui sapien eget mi proin. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel. Fames ac turpis egestas integer eget aliquet nibh praesent. Eu facilisis sed odio morbi quis commodo odio aenean. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Senectus et netus et malesuada fames ac turpis egestas maecenas. Volutpat blandit aliquam etiam erat velit scelerisque in dictum.</p>'
          },
          2023: {
            otherSources:
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis eu volutpat odio facilisis mauris sit amet massa. Dictumst vestibulum rhoncus est pellentesque elit. Ut venenatis tellus in metus vulputate. Vitae suscipit tellus mauris a diam maecenas. Tellus orci ac auctor augue mauris augue neque. Sagittis aliquam malesuada bibendum arcu vitae. Lobortis feugiat vivamus at augue eget arcu dictum varius duis. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Vulputate ut pharetra sit amet aliquam id diam maecenas. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Augue lacus viverra vitae congue eu consequat ac felis donec. Sit amet facilisis magna etiam. Libero id faucibus nisl tincidunt eget nullam non nisi. Integer feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Tristique senectus et netus et malesuada fames. Cursus metus aliquam eleifend mi. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Amet nulla facilisi morbi tempus iaculis urna id.</p>'
          }
        }
      },
      quarterlyFFP: {
        2022: {
          1: {
            combined: 0,
            contractors: 20,
            inHouse: 12
          },
          2: {
            combined: 0,
            contractors: 13,
            inHouse: 12
          },
          3: {
            combined: 0,
            contractors: 40,
            inHouse: 40
          },
          4: {
            combined: 0,
            contractors: 27,
            inHouse: 36
          }
        },
        2023: {
          1: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          2: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          3: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          },
          4: {
            combined: 0,
            contractors: 0,
            inHouse: 0
          }
        }
      }
    },
    {
      fundingSource: 'HIE',
      name: 'Toolbox pro',
      activityOverview: {
        summary:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra aliquet eget sit amet tellus cras adipiscing.</p>',
        description:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Integer quis auctor elit sed vulputate.</p>',
        alternatives:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis imperdiet proin fermentum leo vel orci.</p>',
        standardsAndConditions: {
          doesNotSupport: '',
          supports:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est.</p>'
        }
      },
      activitySchedule: {
        plannedStartDate: '2021-03-30T00:00:00.000+0000',
        plannedEndDate: '2022-06-14T00:00:00.000+0000'
      },
      milestones: [
        {
          milestone: 'Complete test',
          endDate: '2022-05-09T00:00:00.000+0000'
        }
      ],
      outcomes: [
        {
          outcome:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          metrics: []
        }
      ],
      statePersonnel: [
        {
          title: 'Admiral of Red',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          years: {
            2022: {
              amt: 87000,
              perc: 4
            },
            2023: {
              amt: 130000,
              perc: 4
            }
          }
        }
      ],
      expenses: [
        {
          category: 'Training and outreach',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit sed vulputate mi sit.',
          years: {
            2022: 20000,
            2023: 22000
          }
        },
        {
          category: 'Hardware, software, and licensing',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam.',
          years: {
            2022: 43000,
            2023: 55000
          }
        }
      ],
      contractorResources: [
        {
          name: 'Cleric of Life',
          description:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque.</p>',
          start: '2019-09-12T00:00:00.000+0000',
          end: '2022-08-24T00:00:00.000+0000',
          totalCost: 590000,
          years: {
            2022: 380000,
            2023: 210000
          },
          useHourly: false,
          hourly: {
            2022: {
              hours: null,
              rate: null
            },
            2023: {
              hours: null,
              rate: null
            }
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 50,
            state: 50,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          },
          other: 128000
        },
        2023: {
          ffp: {
            federal: 75,
            state: 25,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          },
          other: 329000
        }
      },
      costAllocationNarrative: {
        methodology:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nulla facilisi etiam dignissim diam quis enim. Ac tortor dignissim convallis aenean et tortor at.</p>',
        years: {
          2022: {
            otherSources:
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue interdum velit euismod in. Posuere ac ut consequat semper.</p>'
          },
          2023: {
            otherSources:
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget.</p>'
          }
        }
      },
      quarterlyFFP: {
        2022: {
          1: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          2: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          3: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          4: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          }
        },
        2023: {
          1: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          2: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          3: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          4: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          }
        }
      }
    },
    {
      fundingSource: 'HIT',
      name: 'Toolbox pro Max',
      activityOverview: {
        summary:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nisl nisi scelerisque eu ultrices vitae auctor eu. Neque viverra justo nec ultrices dui sapien eget.</p>',
        description:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat scelerisque varius morbi enim. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere.</p>',
        alternatives:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut consequat semper viverra nam libero justo. Diam ut venenatis tellus in.</p>',
        standardsAndConditions: {
          doesNotSupport: '',
          supports:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis eleifend quam adipiscing vitae. Nunc mattis enim ut tellus elementum sagittis vitae.</p>'
        }
      },
      activitySchedule: {
        plannedStartDate: '2021-03-15T00:00:00.000+0000',
        plannedEndDate: '2022-12-13T00:00:00.000+0000'
      },
      milestones: [
        {
          milestone: 'milestone 1',
          endDate: '2022-08-24T00:00:00.000+0000'
        }
      ],
      outcomes: [
        {
          outcome:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam sit amet nisl suscipit.',
          metrics: []
        },
        {
          outcome:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu consequat ac felis donec et odio.',
          metrics: []
        }
      ],
      statePersonnel: [
        {
          title: 'Deacon of Sanctity',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget egestas purus viverra accumsan in nisl.',
          years: {
            2022: {
              amt: 67000,
              perc: 4
            },
            2023: {
              amt: 87600,
              perc: 5
            }
          }
        }
      ],
      expenses: [
        {
          category: 'Training and outreach',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque convallis a cras semper auctor neque vitae tempus quam.',
          years: {
            2022: 76000,
            2023: 77000
          }
        }
      ],
      contractorResources: [
        {
          name: 'Georgia Golden',
          description:
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu turpis egestas. Eu non diam phasellus vestibulum lorem sed risus.</p>',
          start: '2020-08-07T00:00:00.000+0000',
          end: '2022-01-12T00:00:00.000+0000',
          totalCost: 390000,
          years: {
            2022: 190000,
            2023: 200000
          },
          useHourly: false,
          hourly: {
            2022: {
              hours: null,
              rate: null
            },
            2023: {
              hours: null,
              rate: null
            }
          }
        }
      ],
      costAllocation: {
        2022: {
          ffp: {
            federal: 90,
            state: 10,
            fundingCategory: FUNDING_CATEGORY_TYPE.DDI
          },
          other: 420000
        },
        2023: {
          ffp: {
            federal: 75,
            state: 25,
            fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
          },
          other: 0
        }
      },
      costAllocationNarrative: {
        methodology:
          '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis. Ultrices in iaculis nunc sed augue lacus.</p>',
        years: {
          2022: {
            otherSources:
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est ullamcorper eget nulla facilisi etiam dignissim diam. At in tellus integer feugiat scelerisque varius morbi enim.</p>'
          },
          2023: {
            otherSources: ''
          }
        }
      },
      quarterlyFFP: {
        2022: {
          1: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          2: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          3: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          4: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          }
        },
        2023: {
          1: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          2: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          3: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          },
          4: {
            combined: 25,
            contractors: 25,
            inHouse: 25
          }
        }
      }
    }
  ],
  proposedBudget: {
    incentivePayments: {
      ehAmt: {
        2022: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        2023: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        }
      },
      ehCt: {
        2022: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        2023: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        }
      },
      epAmt: {
        2022: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        2023: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        }
      },
      epCt: {
        2022: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        },
        2023: {
          1: 0,
          2: 0,
          3: 0,
          4: 0
        }
      }
    }
  },
  assurancesAndCompliances: {
    procurement: [
      {
        checked: true,
        title: '42 CFR Part 495.348',
        explanation: ''
      },
      {
        checked: true,
        title: 'SMM Section 11267',
        explanation: ''
      },
      {
        checked: true,
        title: '45 CFR 95.613',
        explanation: ''
      },
      {
        checked: true,
        title: '45 CFR 75.326',
        explanation: ''
      }
    ],
    recordsAccess: [
      {
        checked: true,
        title: '42 CFR Part 495.350',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR Part 495.352',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR Part 495.346',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR 433.112(b)',
        explanation: ''
      },
      {
        checked: true,
        title: '45 CFR Part 95.615',
        explanation: ''
      },
      {
        checked: true,
        title: 'SMM Section 11267',
        explanation: ''
      }
    ],
    softwareRights: [
      {
        checked: true,
        title: '42 CFR 495.360',
        explanation: ''
      },
      {
        checked: true,
        title: '45 CFR 95.617',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR Part 431.300',
        explanation: ''
      },
      {
        checked: true,
        title: '42 CFR Part 433.112',
        explanation: ''
      }
    ],
    security: [
      {
        checked: true,
        title: '45 CFR 164 Security and Privacy',
        explanation: ''
      }
    ]
  },
  createdAt: '2022-06-13T16:56:34.687+0000',
  updatedAt: '2022-06-30T17:11:48.014+0000',
  __v: 0
};
