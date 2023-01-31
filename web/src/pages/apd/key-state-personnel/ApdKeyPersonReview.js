import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import Dollars from '../../../components/Dollars';
import Review from '../../../components/Review';

const ApdStateKeyPerson = ({
  expand,
  index,
  item: { costs, email, hasCosts, name, fte, position, split, medicaidShare },
  onDeleteClick,
  apdType
}) => {
  const primary = index === 0;
  let displayName = name;
  if (name === '') {
    displayName = primary
      ? 'Primary Point of Contact name not specified'
      : 'Key Personnel name not specified';
  }

  const costByYear = useMemo(
    () => (
      <div className="ds-u-margin-top--2">
        {hasCosts === true ? (
          Object.keys(costs).map(year => (
            <div key={year} className="ds-u-padding-bottom--2">
              <strong>FFY {year} Cost: </strong>
              <Dollars>{costs[year]}</Dollars> | <strong>FTE: </strong>
              {fte[year]} | <strong>Total: </strong>
              <Dollars>{costs[year] * fte[year]} </Dollars>
              {apdType === 'HITECH' && (
                <div>
                  <strong>Federal Share: </strong>
                  <Dollars>
                    {costs[year] * fte[year] * (split[year].federal / 100)}
                  </Dollars>
                </div>
              )}
              {apdType === 'MMIS' && (
                <div>
                  <strong>Total Computable Medicaid: </strong>
                  <Dollars>
                    {costs[year] * fte[year] * (medicaidShare[year] / 100)}
                  </Dollars>{' '}
                  ({medicaidShare[year]}% Medicaid Share) |{' '}
                  <strong>Federal Share: </strong>
                  <Dollars>
                    {costs[year] *
                      fte[year] *
                      (split[year].federal / 100) *
                      (medicaidShare[year] / 100)}
                    )
                  </Dollars>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>
            <strong>Total cost:</strong> <Dollars>{0}</Dollars>
          </div>
        )}
      </div>
    ),
    [hasCosts, costs, fte, split, medicaidShare, apdType]
  );

  return (
    <Fragment>
      <div className="visibility--screen">
        <Review
          heading={`${index + 1}. ${displayName}`}
          headingLevel="4"
          onDeleteClick={primary ? null : onDeleteClick}
          onEditClick={expand}
          ariaLabel={displayName}
          objType="Key Personnel"
        >
          <ul className="ds-c-list--bare">
            {primary ? <li>Primary APD Point of Contact</li> : null}
            <li>{position || 'Role not specified'}</li>
          </ul>
          {costByYear}
        </Review>
      </div>
      <div className="visibility--print">
        <Review heading={`${index + 1}. ${displayName}`}>
          <ul className="ds-c-list--bare">
            {primary ? <li>Primary APD Point of Contact</li> : null}
            <li>{position || 'Role not specified'}</li>
            <li>{email}</li>
          </ul>
          {costByYear}
        </Review>
      </div>
    </Fragment>
  );
};

ApdStateKeyPerson.propTypes = {
  expand: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    costs: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    hasCosts: PropTypes.bool,
    name: PropTypes.string.isRequired,
    fte: PropTypes.object.isRequired,
    position: PropTypes.string.isRequired,
    split: PropTypes.object.isRequired,
    medicaidShare: PropTypes.object.isRequired
  }).isRequired,
  onDeleteClick: PropTypes.func,
  apdType: PropTypes.string.isRequired
};

ApdStateKeyPerson.defaultProps = {
  onDeleteClick: null
};

export default ApdStateKeyPerson;
