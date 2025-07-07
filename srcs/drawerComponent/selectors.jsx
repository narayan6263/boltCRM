// selectors.js
import { createSelector } from 'reselect';

// Input selectors
const selectActiveSourceState = (state) => state.activeSource || {};
const selectActiveBranchesState = (state) => state.activeBranches || {};
const selectUpdateContactState = (state) => state.updateContact || {};
const selectLeadState = (state) => state.lead || {};

// Memoized selectors
export const selectSources = createSelector(
  [selectActiveSourceState],
  (activeSource) => ({
    sources: activeSource.activeSource || [],
    loading: activeSource.loading || false,
    error: activeSource.error || null,
  })
);

export const selectBranches = createSelector(
  [selectActiveBranchesState],
  (activeBranches) => ({
    branches: activeBranches.activeBranches || [],
    loading: activeBranches.loading || false,
    error: activeBranches.error || null,
  })
);

export const selectUpdateContact = createSelector(
  [selectUpdateContactState],
  (updateContact) => ({
    loading: updateContact.loading || false,
    error: updateContact.error || null,
  })
);

export const selectLead = createSelector(
  [selectLeadState],
  (lead) => ({
    loading: lead.loading || false,
    error: lead.error || null,
  })
);