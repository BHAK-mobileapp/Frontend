
jest.mock('expo-router', () => ({
    __esModule: true,
    Stack: { Screen: () => null },
    router: { replace: jest.fn() },
}));

const { router } = require('expo-router');
const mockReplace = router.replace;

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}));

jest.mock('../component/Onboarding', () => {
    const React = require('react');
    const { Button } = require('react-native');
    return function MockOnboarding({ onComplete }) {
        return React.createElement(Button, { title: 'Complete', onPress: onComplete });
    };
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import OnboardingScreen from '../app/onboarding';

describe('OnboardingScreen', () => {
    beforeEach(() => {
        mockReplace.mockClear();
        AsyncStorage.setItem.mockClear();
    });

    it('renders the onboarding component (mock) with a Complete button', () => {
        const { getByText } = render(<OnboardingScreen />);
        expect(getByText('Complete')).toBeTruthy();
    });

    it('saves onboarding flag and navigates to welcome on complete', async () => {
        AsyncStorage.setItem.mockResolvedValueOnce(null);

        const { getByText } = render(<OnboardingScreen />);

        fireEvent.press(getByText('Complete'));

        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('hasOnboarded', 'true');
            expect(mockReplace).toHaveBeenCalledWith('/welcome');
        });
    });

    it('still navigates to welcome if saving onboarding flag fails', async () => {
        AsyncStorage.setItem.mockRejectedValueOnce(new Error('boom'));

        const { getByText } = render(<OnboardingScreen />);

        fireEvent.press(getByText('Complete'));

        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith('hasOnboarded', 'true');
            expect(mockReplace).toHaveBeenCalledWith('/welcome');
        });
    });
});

