// import ActivityPage from '../../page-objects/activity-page';
import BudgetPage from '../../page-objects/budget-page.js';
import { testApdName } from '../../helpers/apd/apd-name.js';

/// <reference types="cypress" />

// Tests performing basic MMIS APD tasks

/* eslint-disable no-return-assign */
/* eslint-disable prefer-arrow-callback */

Cypress.session.clearAllSavedSessions();

describe('MMIS Basics', { tags: ['@apd', '@default', '@mmis'] }, function () {
  // let activityPage;
  let budgetPage,
    apdUrl = '/',
    apdId;
  const years = [];

  before(function () {
    // activityPage = new ActivityPage();
    budgetPage = new BudgetPage();
    cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    cy.useStateStaff();
    cy.visit('/');

    // Create a new MMIS APD
    cy.findAllByText('Create new').click();
    cy.findByRole('radio', { name: /MMIS/i }).click();
    cy.findByLabelText('APD Name').clear().type('My First APD').blur();
    cy.findByRole('radio', { name: /No, this is for a new project./i }).click();
    cy.findByRole('checkbox', {
      name: /Claims Processing/i
    }).click();
    cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled').click();

    cy.findByRole(
      'heading',
      { name: /APD Overview/i },
      { timeout: 100000 }
    ).should('exist');

    cy.location('pathname').then(pathname => {
      apdUrl = pathname.replace('/apd-overview', '');
      apdId = apdUrl.split('/').pop();
    });

    cy.get('input[name="apd-years"][checked]').each((_, index, list) =>
      years.push(list[index].value)
    );
  });

  beforeEach(function () {
    cy.wrap(budgetPage).as('budgetPage');
    cy.wrap(apdUrl).as('apdUrl');
    cy.wrap(apdId).as('apdId');
    cy.wrap(years).as('years');

    cy.updateFeatureFlags({ enableMmis: true, adminCheckFlag: true });
    cy.fixture('mmis-basics.json').as('mmisBasics');

    cy.useStateStaff();
    cy.visit(apdUrl);
  });

  after(function () {
    cy.useStateStaff();
    cy.visit('/');
    cy.deleteAPD(this.apdId);
  });

  describe('Create MMIS APD', function () {
    it('tests Create New page and does not save', function () {
      cy.contains('AK APD Home').click();
      cy.findAllByText('Create new').click();

      cy.contains(
        'This selection cannot be changed after creating a new APD.'
      ).should('exist');

      cy.findByRole('radio', { name: /MMIS/i }).focus().blur();
      cy.contains('Select an APD Type').should('exist');

      cy.findByRole('radio', { name: /HITECH/i }).click();
      cy.findAllByText('Select an APD Type').should('not.exist');

      // Verify HITECH fields show
      cy.findAllByText('Update Type').should('exist');
      cy.findAllByText('Medicaid Business Areas').should('not.exist');

      cy.findByRole('radio', { name: /MMIS/i }).click();

      // Verify MMIS fields show
      cy.findAllByText('Is this an APD update?').should('exist');
      cy.findAllByText('Medicaid Business Areas').should('exist');

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      cy.findByLabelText('APD Name').clear().type('Not Saving This One').blur();

      cy.findByRole('radio', { name: /Yes, it is an update/i })
        .focus()
        .blur();
      cy.contains('Indicate whether this APD is an update.').should('exist');

      cy.findByRole('radio', {
        name: /No, this is for a new project/i
      }).click();
      cy.findAllByText('Indicate whether this APD is an update.').should(
        'not.exist'
      );
      cy.findAllByText('Update Type').should('not.exist');

      cy.findByRole('radio', { name: /Yes, it is an update/i }).click();
      cy.findAllByText('Indicate whether this APD is an update.').should(
        'not.exist'
      );
      cy.findAllByText('Update Type').should('exist');
      cy.findByRole('checkbox', { name: /Annual update/i })
        .focus()
        .blur()
        .should('exist');
      cy.findByRole('checkbox', { name: /As-needed update/i }).should('exist');
      cy.contains('Select at least one type of update.').should('exist');

      cy.findByRole('checkbox', { name: /Annual update/i }).click();
      cy.contains('Select at least one type of update.').should('not.exist');

      // Year validation
      this.years.forEach(year => {
        cy.findByRole('checkbox', { name: year }).click();
      });
      cy.contains('Select at least one year.').should('exist');

      this.years.forEach(year => {
        cy.findByRole('checkbox', { name: year }).click();
      });
      cy.contains('Select at least one year.').should('not.exist');

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      // Medicaid Business Area validation
      cy.findByRole('checkbox', {
        name: /1115 or Waiver Support Systems/i
      })
        .focus()
        .blur();
      cy.contains('Select at least one Medicaid Business Area.').should(
        'exist'
      );

      cy.findByRole('checkbox', {
        name: /Program Integrity/i
      }).click();
      cy.contains('Select at least one Medicaid Business Area.').should(
        'not.exist'
      );

      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled');

      // Other MBA Validation
      cy.findByText('Other').click();

      cy.get(`[data-cy='create_apd_btn']`).should('be.disabled');

      cy.get(`[data-cy='other_details']`).focus().blur();
      cy.contains('Select at least one Medicaid Business Area.').should(
        'not.exist'
      );

      cy.get(`[data-cy='other_details']`).type('This is other stuff.').blur();

      cy.get(`[data-cy='create_apd_btn']`).should('not.be.disabled');
      cy.findByRole('button', { name: /Cancel/i }).click();
      cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting

      cy.contains('Not Saving This One').should('not.exist');
    });
  });

  describe('MMIS Pages', function () {
    describe('APD Overview page', () => {
      testApdName();

      it('tests APD Update section', () => {
        cy.goToApdOverview();

        // When No is selected in the Is Update section, Update Type options do NOT display
        cy.findByText('Is this an APD update?').should('exist');

        cy.findByRole('radio', {
          name: /No, this is for a new project./i
        }).click();

        cy.findByText('Update Type').should('not.exist');

        // When Yes is selected in the Is Update section, Update Type options display
        cy.findByRole('radio', { name: /Yes, it is an update./i }).click();
        cy.findByText('Update Type').should('exist');

        // Before selecting an update type validation error shows up in admin check
        cy.turnOnAdminCheck();
        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list).contains('Select an update type.').should('exist');
        });
        cy.collapseAdminCheck();

        // Before selecting an update type validation error shows up in form
        cy.goToApdOverview();
        cy.contains('Select an update type.').should('exist');

        // Select an update type to ensure form error and admin check error is removed
        cy.findByRole('checkbox', { name: /As-needed update/i }).click();
        cy.contains('Select an update type.').should('not.exist');
        cy.expandAdminCheck();
        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list).contains('Select an update type.').should('not.exist');
        });
      });

      it('tests Medicaid Business Areas section', () => {
        cy.goToApdOverview();

        // Uncheck the option chosen when APD was created in the test's "before" hook
        cy.findByRole('checkbox', {
          name: /Claims Processing/i
        }).click();

        // Check validation errors within admin check list
        cy.turnOnAdminCheck();
        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list).contains('APD Overview').should('exist');
          cy.get(list)
            .contains('Select at least one Medicaid Business Area.')
            .should('exist');
        });

        cy.collapseAdminCheck();
        cy.goToApdOverview();

        // Check validation error exists within form
        cy.contains('Select at least one Medicaid Business Area.').should(
          'exist'
        );

        // Fill out field
        cy.findByRole('checkbox', {
          name: /Other/i
        }).click();

        // Check validation errors change on page
        cy.contains('Select at least one Medicaid Business Area.').should(
          'not.exist'
        );
        cy.contains('Provide Other Medicaid Business Area(s).').should('exist');

        // Check validation errors change in admin check
        cy.expandAdminCheck();
        cy.get('[class="eapd-admin-check-list"]').within(list => {
          // Selecting a choice will clear this error
          cy.get(list)
            .contains('Select at least one Medicaid Business Area.')
            .should('not.exist');

          // Selecting "Other" without filling in the "Other Medicaid Business Area(s)" text box will show a new error
          cy.get(list).contains('APD Overview').should('exist');
          cy.get(list)
            .contains('Provide Other Medicaid Business Area(s).')
            .should('exist');
        });

        // Fill out "Other Medicaid Business Area(s)" text box and check that error is cleared
        cy.collapseAdminCheck();
        cy.get(`[data-cy='other_details']`)
          .type('This info in the text box should clear the error.')
          .blur();
        // Error cleared in form
        cy.contains('Provide Other Medicaid Business Area(s).').should(
          'not.exist'
        );
        // Error cleared in admin check
        cy.expandAdminCheck();
        cy.get('[class="eapd-admin-check-list"]').within(list => {
          cy.get(list).contains('APD Overview').should('not.exist');
          cy.get(list)
            .contains('Provide Other Medicaid Business Area(s).')
            .should('not.exist');
        });
        cy.turnOffAdminCheck();

        // Verify that fields save
        // Navigates away from page and back to check persistence of entered data
        cy.contains('Export and Submit').click();
        cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
        cy.goToApdOverview();
        cy.findByRole('checkbox', {
          name: /Other/i
        }).should('be.checked');
        cy.get(`[data-cy='other_details']`).should(
          'have.value',
          'This info in the text box should clear the error.'
        );
      });
    });

    it('test MMIS APD Basics', function () {
      const mmisBasics = this.mmisBasics;
      // Key State Personnel
      cy.goToKeyStatePersonnel();
      cy.contains('Key Personnel and Program Management').should('exist');

      cy.findByRole('button', { name: /Add Primary Contact/i }).click();

      cy.get('[data-cy="key-person-0__name"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[0].name);

      cy.get('[data-cy="key-person-0__email"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[0].email);

      cy.get('[data-cy="key-person-0__position"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[0].position);

      cy.get('input[type="radio"][value="no"]').check({ force: true }).blur();
      cy.findByRole('button', { name: /Save/i }).click();

      cy.findByRole('button', { name: /Add Key Personnel/i }).click();

      cy.get('[data-cy="key-person-1__name"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[1].name);

      cy.get('[data-cy="key-person-1__email"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[1].email);

      cy.get('[data-cy="key-person-1__position"]')
        .clear()
        .type(mmisBasics.keyStatePersonnel.keyPersonnel[1].position);

      cy.get('input[type="radio"][value="yes"]').check({ force: true }).blur();
      cy.get('[data-cy="key-person-1-0__cost"]').clear().type('1000');
      cy.get('[data-cy="key-person-1-0__fte"]').clear().type('.5');
      cy.get('[data-cy="key-person-1-0__medicaidShare"]')
        .eq(0)
        .clear()
        .type('50');
      cy.findAllByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      }).check({ force: true });

      cy.get('[data-cy="key-person-1-1__cost"]').clear().type('2000');
      cy.get('[data-cy="key-person-1-1__fte"]').clear().type('1');
      cy.get('[data-cy="key-person-1-1__medicaidShare"]').clear().type('100');
      cy.findAllByRole('radio', {
        name: '90/10 Design, Development, and Installation (DDI)'
      })
        .eq(1)
        .check({ force: true });

      cy.findByRole('button', { name: /Save/i }).click();

      cy.contains(
        'Total Computable Medicaid: $250 (50% Medicaid Share) '
      ).should('exist');
      cy.contains('Federal Share: $225').should('exist');
      cy.contains(
        'Total Computable Medicaid: $2,000 (100% Medicaid Share)'
      ).should('exist');
      cy.contains('Federal Share: $1,800').should('exist');

      // Previous Activities
      cy.goToPreviousActivities();

      cy.findAllByText('Grand totals: Federal MMIS').should('exist');
      cy.findAllByText('HIT + HIE Federal share 90% FFP').should('not.exist');

      cy.checkTinyMCE('previous-activity-summary-field', '');
      cy.setTinyMceContent(
        'previous-activity-summary-field',
        mmisBasics.previousActivities.previousActivitySummary
      );
      cy.waitForSave();

      cy.goToApdOverview();
      cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.goToPreviousActivities();
      cy.checkTinyMCE(
        'previous-activity-summary-field',
        `<p>${mmisBasics.previousActivities.previousActivitySummary}</p>`
      );

      // Activity Tests
      cy.goToActivityDashboard();

      // Create new Activity
      cy.contains('Add Activity').click();
      cy.contains('Activity 1').should('exist');

      //
      // Check Activity Overview
      //
      cy.goToActivityOverview(0);
      cy.url().should('contain', '/activity/0/overview');
      cy.findAllByRole('heading', { name: /Activity Overview/i }).should(
        'exist'
      );

      // Defaults to empty field values
      cy.contains('Activity name').should('exist');
      cy.checkTinyMCE('activity-name-field', '');
      cy.contains('Activity snapshot').should('exist');
      cy.checkTinyMCE('activity-snapshot-field', '');
      cy.contains('Problem statement').should('exist');
      cy.checkTinyMCE('activity-problem-statement-field', '');
      cy.contains('Proposed solution').should('exist');
      cy.checkTinyMCE('activity-proposed-solution-field', '');

      // Check validation errors
      cy.turnOnAdminCheck();

      // Validation errors within admin check list
      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list).contains('Activity 1 Activity Overview').should('exist');
        cy.get(list).contains('Provide an Activity name').should('exist');
        cy.get(list).contains('Provide an Activity snapshot').should('exist');
        cy.get(list).contains('Provide a Problem statement').should('exist');
        cy.get(list).contains('Provide a Proposed solution').should('exist');
      });

      // Verifies Activity Overview exists in the admin check list and navigates to that page
      cy.checkAdminCheckHyperlinks(
        'Activity 1 Activity Overview',
        'Activity Overview',
        3
      );

      // Validation errors on the Activity Overview page
      cy.contains('Provide an Activity name').should('exist');
      cy.get('[data-cy="validationError"]')
        .contains('Provide an Activity snapshot')
        .should('exist');
      cy.get('[data-cy="validationError"]')
        .contains('Provide a Problem statement')
        .should('exist');
      cy.get('[data-cy="validationError"]')
        .contains('Provide a Proposed solution')
        .should('exist');

      cy.collapseAdminCheck();

      // Fill out fields and check that each validation error is cleared
      cy.get(`[data-cy="activity-name"]`)
        .click()
        .type(mmisBasics.activities[0].name);
      cy.waitForSave();
      cy.contains('Provide an Activity name').should('not.exist');

      cy.setTinyMceContent(
        'activity-snapshot-field',
        mmisBasics.activities[0].activityOverview.activitySnapshot
      );
      cy.waitForSave();
      cy.contains('Provide an Activity snapshot').should('not.exist');

      cy.setTinyMceContent(
        'activity-problem-statement-field',
        mmisBasics.activities[0].activityOverview.problemStatement
      );
      cy.waitForSave();
      cy.contains('Provide a Problem statement').should('not.exist');

      cy.setTinyMceContent(
        'activity-proposed-solution-field',
        mmisBasics.activities[0].activityOverview.proposedSolution
      );
      cy.waitForSave();
      cy.contains('Provide a Proposed solution').should('not.exist');

      // Check validation errors are gone from admin check
      cy.expandAdminCheck();
      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list)
          .contains('Activity 1 Activity Overview')
          .should('not.exist');
      });
      cy.turnOffAdminCheck();

      // Verify that fields save
      // Navigates away from page and back to check persistence of entered data
      cy.goToApdOverview();
      cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.goToActivityOverview(0);

      cy.contains('Activity name').should('exist');
      cy.checkTinyMCE('activity-name-field', mmisBasics.activities[0].name);
      cy.contains('Activity snapshot').should('exist');
      cy.checkTinyMCE(
        'activity-snapshot-field',
        `<p>${mmisBasics.activities[0].activityOverview.activitySnapshot}</p>`
      );
      cy.contains('Problem statement').should('exist');
      cy.checkTinyMCE(
        'activity-problem-statement-field',
        `<p>${mmisBasics.activities[0].activityOverview.problemStatement}</p>`
      );
      cy.contains('Proposed solution').should('exist');
      cy.checkTinyMCE(
        'activity-proposed-solution-field',
        `<p>${mmisBasics.activities[0].activityOverview.proposedSolution}</p>`
      );

      // Budget and FFP
      cy.goToBudgetAndFFP(0);
      cy.contains('Budget and FFP').should('exist');

      cy.then(() => {
        this.years.forEach(year => {
          cy.contains(`Budget for FFY ${year}`)
            .parent()
            .parent()
            .within(() => {
              budgetPage.checkMatchRateFunctionality();
            });
        });
      });

      // Security Planning
      cy.turnOnAdminCheck();
      cy.checkAdminCheckHyperlinks('Security Planning', 'Security Planning', 2);

      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list).contains('Security Planning').should('exist');
      });

      cy.contains('Provide Security and Interface Plan').should('exist');
      cy.checkTinyMCE('security-interface-plan', '');

      cy.setTinyMceContent(
        'security-interface-plan',
        mmisBasics.securityPlanning.securityAndInterfacePlan
      );

      cy.waitForSave();

      cy.contains('Provide Security and Interface Plan').should('not.exist');

      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'exist'
      );
      cy.checkTinyMCE('bc-dr-plan', '');

      cy.setTinyMceContent(
        'bc-dr-plan',
        mmisBasics.securityPlanning.businessContinuityAndDisasterRecovery
      );
      cy.waitForSave();

      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'not.exist'
      );

      // Verify fields saved
      cy.goToApdOverview();
      cy.wait(2000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.goToSecurityPlanning();

      cy.checkTinyMCE(
        'security-interface-plan',
        `<p>${mmisBasics.securityPlanning.securityAndInterfacePlan}</p>`
      );
      cy.checkTinyMCE(
        'bc-dr-plan',
        `<p>${mmisBasics.securityPlanning.businessContinuityAndDisasterRecovery}</p>`
      );

      cy.get('[class="eapd-admin-check-list"]').within(list => {
        cy.get(list).contains('Security Planning').should('not.exist');
      });

      // Verify validation disappears when Admin Check is off
      cy.setTinyMceContent('security-interface-plan', '');
      cy.contains('Provide Security and Interface Plan').should('exist');

      cy.setTinyMceContent('bc-dr-plan', '');
      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'exist'
      );

      cy.findByRole('button', { name: /Stop Administrative Check/i }).click({
        force: true
      });

      cy.contains('Provide Security and Interface Plan').should('not.exist');
      cy.contains('Provide Business Continuity and Disaster Recovery').should(
        'not.exist'
      );

      // Todo: TEST CONTINUE AND BACK BUTTONS, Assurances and Compliance page crashes though.
    });
  });
});
