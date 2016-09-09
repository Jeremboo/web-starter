import { connect } from 'react-redux';
import { switchVisibilityFilter } from 'core/actionCreator';

import Filter from 'components/Filter/Filter';


const mapStateToFilterProps = state => ({
  visibilityFilter: state.visibilityFilter,
});

const mapDispatchToFilterProps = dispatch => ({
  onFilterClick: () => {
    dispatch(switchVisibilityFilter());
  },
});

const FilterContainer = connect(
  mapStateToFilterProps,
  mapDispatchToFilterProps
)(Filter);

export default FilterContainer;
