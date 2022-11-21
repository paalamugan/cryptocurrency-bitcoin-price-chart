vi.mock('chart.js', async () => {
  const actual = await vi.importActual<{ default: typeof import('chart.js') }>(
    'chart.js'
  );
  return { default: actual.default, ...actual.default };
});

vi.mock('react-chartjs-2');

const matchMediaMock = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

vi.stubGlobal('matchMedia', matchMediaMock);

export {};
