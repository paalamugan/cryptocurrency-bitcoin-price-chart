import { render, screen, waitFor } from '@/tests/utils';
import App from './App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);
    expect(
      screen.getByText(/Paalamugan. All rights reserved/)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Bitcoin/)).toBeInTheDocument();
    });
  });
});
