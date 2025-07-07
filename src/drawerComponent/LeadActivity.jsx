// import React, { useEffect, useRef } from 'react';
// import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { styled } from 'nativewind';
// import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
// import { format } from 'date-fns';
// import { fetchLeadActivity } from '../redux/slice/index';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTouchable = styled(TouchableOpacity);

// const LeadActivity = ({ lead, navigation, isActive }) => {
//   const dispatch = useDispatch();
//   const leadId = lead?.leadId;
//   const hasFetched = useRef({}); // Use a ref to store fetched state for each leadId

//   // Select state from Redux store
//   const { leadActivities, loading: activityLoading, error: activityError } = useSelector(
//     (state) => state.leadActivity || { leadActivities: [], loading: false, error: null }
//   );

//   // Debug logs
//   console.log('LeadActivity: leadId', leadId);
//   console.log('LeadActivity: leadActivities', JSON.stringify(leadActivities, null, 2));

//   // Fetch lead activity when component mounts or leadId changes
//   useEffect(() => {
//     if (!isActive) {
//       // Optionally, you might want to clear existing data when the tab is no longer active
//       // dispatch(resetLeadActivityState()); // Assuming you have such an action
//       return;
//     }

//     if (leadId) {
//       if (!hasFetched.current[leadId]) {
//         console.log(`LeadActivity: Fetching activity for leadId ${leadId}`);
//         dispatch(fetchLeadActivity(leadId))
//           .then(() => {
//             hasFetched.current[leadId] = true; // Mark as fetched on success
//           })
//           .catch((err) =>
//             console.error('LeadActivity: Dispatch error:', err)
//           );
//       } else {
//         console.log(`LeadActivity: Data for leadId ${leadId} already fetched, skipping.`);
//       }
//     } else {
//       console.warn('LeadActivity: No leadId provided');
//     }
//   }, [dispatch, leadId, isActive]);

//   // Render each activity item
//   const renderActivityItem = ({ item }) => {
//     console.log('LeadActivity: renderActivityItem item', JSON.stringify(item, null, 2));

//     return (
//       <StyledView className="flex-row border-b border-gray-200 py-2">
//         <StyledText className="flex-1 text-label font-familyFontInter px-2">
//           {item.date ? format(new Date(item.date), 'dd MMM yyyy') : 'N/A'}
//         </StyledText>
//         <StyledText className="flex-1 text-black text-label font-familyFontInter px-2">
//           {item.description || 'N/A'}
//         </StyledText>
//         <StyledText className="flex-1 text-black text-label font-familyFontInter px-2">
//           {item.processedBy || 'N/A'}
//         </StyledText>
//       </StyledView>
//     );
//   };

//   return (
//     <StyledView className="flex-1 bg-white p-4">
//       {/* Table Header */}
//       <StyledView className="flex-row bg-gray-100 py-2 border-b border-gray-300">
//         <StyledText className="flex-1 text-black font-familyFontLatoBold text-label px-2">Date</StyledText>
//         <StyledText className="flex-1 text-black font-familyFontLatoBold text-label px-2">Description</StyledText>
//         <StyledText className="flex-1 text-black font-familyFontLatoBold text-label px-2">Processed By</StyledText>
//       </StyledView>

//       {/* Loading State */}
//       {activityLoading && (
//         <StyledView className="flex-1 justify-center items-center">
//           <ActivityIndicator size="large" color="#0000ff" />
//         </StyledView>
//       )}

//       {/* Error State */}
//       {activityError && (
//         <StyledView className="flex-1 justify-center items-center">
//           <StyledText className="text-red-500 text-center">
//             Error: {activityError}
//           </StyledText>
//           <StyledTouchable
//             className="bg-blue-500 p-2 rounded-md mt-4"
//             onPress={() => leadId && dispatch(fetchLeadActivity(leadId))}
//           >
//             <StyledText className="text-white">Retry</StyledText>
//           </StyledTouchable>
//         </StyledView>
//       )}

//       {/* Data Loaded */}
//       {!activityLoading && !activityError && leadActivities && leadActivities.length > 0 ? (
//         <FlatList
//           data={leadActivities}
//           renderItem={renderActivityItem}
//           keyExtractor={(item, index) => `${item._id || index}`}
//           showsVerticalScrollIndicator={false}
//         />
//       ) : (
//         !activityLoading && !activityError && (
//           <StyledView className="flex-1 justify-center items-center">
//             <StyledText className="text-gray-500 text-center">No activity found</StyledText>
//           </StyledView>
//         )
//       )}
//     </StyledView>
//   );
// };

// // Prop validation
// LeadActivity.propTypes = {
//   lead: PropTypes.shape({
//     leadId: PropTypes.string.isRequired,
//   }).isRequired,
//   navigation: PropTypes.object.isRequired,
//   isActive: PropTypes.bool.isRequired,
// };

// export default LeadActivity;

import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { fetchLeadActivity } from '../redux/slice/index';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const LeadActivity = ({ lead, navigation, isActive }) => {
  const dispatch = useDispatch();
  const leadId = lead?.leadId;
  const hasFetched = useRef({}); // Track fetched leadIds

  const { leadActivities, loading: activityLoading, error: activityError } = useSelector(
    (state) => state.leadActivity || { leadActivities: [], loading: false, error: null }
  );

  useEffect(() => {
    if (!isActive) {
      console.log('LeadActivity: Tab inactive, skipping fetch');
      return;
    }

    if (leadId && !hasFetched.current[leadId]) {
      console.log(`LeadActivity: Fetching activity for leadId ${leadId}`);
      dispatch(fetchLeadActivity(leadId))
        .then(() => {
          hasFetched.current[leadId] = true; // Mark as fetched
        })
        .catch((err) => console.error('LeadActivity: Dispatch error:', err));
    } else if (leadId && hasFetched.current[leadId]) {
      console.log(`LeadActivity: Skipping fetch for leadId ${leadId}, using cached data`);
    } else {
      console.warn('LeadActivity: No leadId provided');
    }
  }, [dispatch, leadId, isActive]);

  const renderActivityItem = ({ item }) => {
    return (
      <StyledView className="flex-row border-b border-gray-200 py-2">
        <StyledText className="flex-1 text-label font-familyFontInter px-2">
          {item.date ? format(new Date(item.date), 'dd MMM yyyy') : 'N/A'}
        </StyledText>
        <StyledText className="flex-1 text-black text-label font-familyFontInter px-2">
          {item.description || 'N/A'}
        </StyledText>
        <StyledText className="flex-1 text-black text-label font-familyFontInter px-2">
          {item.processedBy || 'N/A'}
        </StyledText>
      </StyledView>
    );
  };

  return (
    <StyledView className="flex-1 bg-white p-4">
      <StyledView className="flex-row bg-gray-100 py-2 border-b border-gray-300">
        <StyledText className="flex-1 text-black font-familyFontLatoBold text-label px-2">Date</StyledText>
        <StyledText className="flex-1 text-black font-familyFontLatoBold text-label px-2">Description</StyledText>
        <StyledText className="flex-1 text-black font-familyFontLatoBold text-label px-2">Processed By</StyledText>
      </StyledView>
      {activityLoading && (
        <StyledView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </StyledView>
      )}
      {activityError && (
        <StyledView className="flex-1 justify-center items-center">
          <StyledText className="text-red-500 text-center">
            Error: {activityError}
          </StyledText>
          <StyledTouchable
            className="bg-blue-500 p-2 rounded-md mt-4"
            onPress={() => {
              hasFetched.current[leadId] = false; // Allow retry
              dispatch(fetchLeadActivity(leadId));
            }}
          >
            <StyledText className="text-white">Retry</StyledText>
          </StyledTouchable>
        </StyledView>
      )}
      {!activityLoading && !activityError && leadActivities && leadActivities.length > 0 ? (
        <FlatList
          data={leadActivities}
          renderItem={renderActivityItem}
          keyExtractor={(item, index) => `${item._id || index}`}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        !activityLoading && !activityError && (
          <StyledView className="flex-1 justify-center items-center">
            <StyledText className="text-gray-500 text-center">No activity found</StyledText>
          </StyledView>
        )
      )}
    </StyledView>
  );
};

LeadActivity.propTypes = {
  lead: PropTypes.shape({
    leadId: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default LeadActivity;