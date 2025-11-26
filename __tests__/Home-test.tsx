jest.mock('expo-router', () => {
    const React = require('react');
    const Screen = (_props: any) => null;
    const Stack: any = (props: any) => props.children ?? null;
    Stack.Screen = Screen;
    return { Stack };
});

import { render } from '@testing-library/react-native';
import Home from '../app/home';

describe('Home screen', () => {
    test('renders main title and distance indicator', () => {
        const { getByText } = render(<Home />);

        expect(getByText('Mới nhất gần bạn')).toBeTruthy();
        expect(getByText('Cách bạn 1km')).toBeTruthy();
    });

    test('renders section title and product items', () => {
        const { getByText } = render(<Home />);

        expect(getByText('Sản phẩm mới nhất')).toBeTruthy();

        expect(getByText('Chảo Sunhouse')).toBeTruthy();
        expect(getByText('Xiaomi Mi Band 7 Pro')).toBeTruthy();
        expect(getByText('Đắc Nhân Tâm')).toBeTruthy();
    });

    test('renders bottom navigation items', () => {
        const { getByText } = render(<Home />);

        expect(getByText('Trang chủ')).toBeTruthy();
        expect(getByText('Lên kệ')).toBeTruthy();
        expect(getByText('Chat')).toBeTruthy();
        expect(getByText('Tài khoản')).toBeTruthy();
    });
});

