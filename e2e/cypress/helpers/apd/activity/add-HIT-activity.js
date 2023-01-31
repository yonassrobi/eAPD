/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import BudgetPage from '../../../page-objects/budget-page.js';
import FillOutActivityPage from '../../../page-objects/fill-out-activity-page.js';
import ExportPage from '../../../page-objects/export-page.js';

const { _ } = Cypress;

export const addHITActivity = function () {
  let budgetPage;
  let exportPage;
  let fillOutActivityPage;

  before(function () {
    budgetPage = new BudgetPage();
    exportPage = new ExportPage();
    fillOutActivityPage = new FillOutActivityPage();
  });

  beforeEach(function () {
    cy.fixture('HIT-activity-template.json').as('activityData');
  });

  describe('Add a HIT Activity and check in export view', function () {
    it('Adds an HIT Activity and checks the export view', function () {
      const years = this.years;
      const activityData = this.activityData;
      cy.goToActivityDashboard();

      // Add activity
      cy.url().should('include', '/activities');
      cy.findByRole('heading', { name: /Activities/i, level: 2 }).should(
        'exist'
      );
      cy.contains('Activity 1: Program Administration (HIT)').should('exist');
      cy.get('#activities').findAllByText('Edit').eq(0).click();

      // Fill out Activity Overview
      cy.findAllByText(`Activity 1: ${activityData.activityName}`).should(
        'exist'
      );
      fillOutActivityPage.fillActivityOverview(activityData.activityOverview);

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Activity Schedule and Milestones
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillActivityScheduleAndMilestones(
        activityData.activityOverview,
        activityData.milestones
      );

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Outcomes and Metrics
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillOutcomesAndMetrics(activityData.outcomes);

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out State Staff and Other State Expenses
      cy.findByRole('heading', {
        name: /Activity 1:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.fillStateStaff(years, activityData.staff);

      fillOutActivityPage.fillStateExpenses(years, activityData.expenses);

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Private Contractor Costs
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');

      fillOutActivityPage.addPrivateContractors(
        activityData.privateContractors,
        years
      );

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Cost Allocation
      fillOutActivityPage.fillCostAllocation(
        activityData.costAllocation,
        years
      );
      cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.waitForSave();

      _.forEach(years, (year, i) => {
        budgetPage.checkActivityTotalCostTableNew({
          expectedTable: activityData.costAllocationActivityTotalCostTables[i],
          index: i
        });
      });

      cy.waitForSave();
      cy.get('[id="continue-button"]').click();

      // Fill out Budget and FFP
      cy.findByRole('heading', {
        name: /^Activity 1:/i,
        level: 2
      }).should('exist');

      cy.findByRole('heading', { name: /Budget and FFP/i, level: 2 }).should(
        'exist'
      );

      fillOutActivityPage.checkBudgetAndFFPTables({
        budgetData: activityData.budgetAndFFPTables,
        years,
        firstSplit: '75-25',
        secondSplit: '50-50',
        isViewOnly: false
      });

      const {
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        totalFederalShare,
        totalStateShare
      } = activityData.FFYTotalDescription;
      budgetPage.checkFFYtotals({
        years,
        activityIndex: 0,
        activityName: activityData.activityName,
        totalCost,
        totalOtherFunding,
        totalTotalMedicaidCost,
        fundingSplit: `75/25 (FFY ${years[0]}) and 50/50 (FFY ${years[1]})`,
        totalFederalShare,
        state: 'Alaska',
        totalStateShare
      });

      cy.waitForSave();
      cy.goToExportView();

      // Check activity list list in export view
      cy.findAllByText('Activities')
        .next()
        .within(() => {
          cy.contains(`1. ${activityData.activityName} | HIT`);
        });

      // Check activity section in export view
      cy.findAllByText('Activities')
        .parent()
        .within(() => {
          cy.findAllByText(`Activity 1: ${activityData.activityName}`)
            .first()
            .parent()
            .within(() => {
              // Check Activity Overview
              const overviewData = activityData.activityOverview;
              exportPage.checkActivityOverview({
                ...overviewData,
                doesNotSupportsMedicaid:
                  'No response was provided for how this activity will support the Medicaid standards and conditions.',
                startDate: overviewData.startDate.join('/'),
                endDate: overviewData.endDate.join('/')
              });

              // Check Outcomes and Metrics
              exportPage.checkOutcomes({
                outcome: activityData.outcomes.names[0],
                metrics: activityData.outcomes.metrics[0]
              });

              exportPage.checkMilestones({
                milestone: activityData.milestones.names[0],
                milestoneCompletionDate:
                  activityData.milestones.dates[0].join('/')
              });

              // Check State Staff and Expenses
              exportPage.checkStateStaff({
                staff: activityData.staff.slice(0),
                years
              });
              exportPage.checkStateExpenses({
                expenses: activityData.expenses.slice(0),
                years
              });

              // Check Private Contractors
              exportPage.checkPrivateContractorCosts({
                contractors: activityData.privateContractors.slice(0),
                years
              });

              // Check Cost Allocation
              exportPage.checkCostAllocationAndOtherFunding({
                years,
                costAllocation: activityData.costAllocation
              });

              // Check Budget and FFP
              fillOutActivityPage.checkBudgetAndFFPTables({
                budgetData: activityData.budgetAndFFPTables,
                years,
                firstSplit: '50-50',
                secondSplit: '75-25',
                isViewOnly: true
              });
            });
        });
    });
  });
};
