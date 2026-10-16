import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@/screens/auth/SplashScreen';
import SessionCheckScreen from '@/screens/auth/SessionCheckScreen';
import NoInternetScreen from '@/screens/auth/NoInternetScreen';
import MaintenanceScreen from '@/screens/auth/MaintenanceScreen';
import UpdateRequiredScreen from '@/screens/auth/UpdateRequiredScreen';
import ResumeTripScreen from '@/screens/auth/ResumeTripScreen';
import RiderLoginScreen from '@/screens/auth/RiderLoginScreen';
import OtpVerificationScreen from '@/screens/auth/OtpVerificationScreen';
import BecomeRiderScreen from '@/screens/auth/BecomeRiderScreen';
import PersonalDetailsScreen from '@/screens/registration/PersonalDetailsScreen';
import VehicleTypeScreen from '@/screens/registration/VehicleTypeScreen';
import VehicleDetailsScreen from '@/screens/registration/VehicleDetailsScreen';
import DocumentChecklistScreen from '@/screens/registration/DocumentChecklistScreen';
import UploadDocumentScreen from '@/screens/registration/UploadDocumentScreen';
import PayoutIntroScreen from '@/screens/registration/PayoutIntroScreen';
import ReviewSubmitScreen from '@/screens/registration/ReviewSubmitScreen';
import VerificationPendingScreen from '@/screens/registration/VerificationPendingScreen';
import VerificationRejectedScreen from '@/screens/registration/VerificationRejectedScreen';
import DriverIntroScreen from '@/screens/driver/DriverIntroScreen';
import DriverPersonalScreen from '@/screens/driver/DriverPersonalScreen';
import DriverExperienceScreen from '@/screens/driver/DriverExperienceScreen';
import DriverAvailabilityScreen from '@/screens/driver/DriverAvailabilityScreen';
import DriverDocumentsScreen from '@/screens/driver/DriverDocumentsScreen';
import DriverUploadDocumentScreen from '@/screens/driver/DriverUploadDocumentScreen';
import DriverPayoutScreen from '@/screens/driver/DriverPayoutScreen';
import DriverReviewScreen from '@/screens/driver/DriverReviewScreen';
import DriverVerificationPendingScreen from '@/screens/driver/DriverVerificationPendingScreen';
import DriverVerificationRejectedScreen from '@/screens/driver/DriverVerificationRejectedScreen';
import PayoutHistoryScreen from '@/screens/earnings/PayoutHistoryScreen';
import EarningsActivityScreen from '@/screens/earnings/EarningsActivityScreen';
import PayoutDetailScreen from '@/screens/earnings/PayoutDetailScreen';
import WeeklyPlanScreen from '@/screens/earnings/WeeklyPlanScreen';


import MainTabs from './MainTabs';
import AlertsScreen from '@/screens/tabs/AlertsScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="SessionCheck" component={SessionCheckScreen} />
                <Stack.Screen name="NoInternet" component={NoInternetScreen} />
                <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
                <Stack.Screen name="UpdateRequired" component={UpdateRequiredScreen} />
                <Stack.Screen name="ResumeTrip" component={ResumeTripScreen} />
                <Stack.Screen name="RiderLogin" component={RiderLoginScreen} />
                <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
                <Stack.Screen name="BecomeRider" component={BecomeRiderScreen} />
                <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
                <Stack.Screen name="VehicleType" component={VehicleTypeScreen} />
                <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
                <Stack.Screen name="DocumentChecklist" component={DocumentChecklistScreen} />
                <Stack.Screen name="UploadDocument" component={UploadDocumentScreen} />
                <Stack.Screen name="PayoutIntro" component={PayoutIntroScreen} />
                <Stack.Screen name="ReviewSubmit" component={ReviewSubmitScreen} />
                <Stack.Screen name="VerificationPending" component={VerificationPendingScreen} />
                <Stack.Screen name="VerificationRejected" component={VerificationRejectedScreen} />
                <Stack.Screen name="DriverIntro" component={DriverIntroScreen} />
                <Stack.Screen name="DriverPersonal" component={DriverPersonalScreen} />
                <Stack.Screen name="DriverExperience" component={DriverExperienceScreen} />
                <Stack.Screen name="DriverAvailability" component={DriverAvailabilityScreen} />
                <Stack.Screen name="DriverDocuments" component={DriverDocumentsScreen} />
                <Stack.Screen name="DriverUploadDocument" component={DriverUploadDocumentScreen} />
                <Stack.Screen name="DriverPayout" component={DriverPayoutScreen} />
                <Stack.Screen name="DriverReview" component={DriverReviewScreen} />
                <Stack.Screen name="DriverVerificationPending" component={DriverVerificationPendingScreen} />
                <Stack.Screen name="DriverVerificationRejected" component={DriverVerificationRejectedScreen} />

                <Stack.Screen name="Home" component={MainTabs} />
                <Stack.Screen name="Alerts" component={AlertsScreen} />
                <Stack.Screen name="PayoutHistory" component={PayoutHistoryScreen} />
                <Stack.Screen name="EarningsActivity" component={EarningsActivityScreen} />
                <Stack.Screen name="PayoutDetail" component={PayoutDetailScreen} />
                <Stack.Screen name="WeeklyPlan" component={WeeklyPlanScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
