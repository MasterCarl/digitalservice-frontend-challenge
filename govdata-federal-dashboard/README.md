# GovData dashboard for federal institutions

This dashboard shows how many datasets were contributed to GovData.de by different ministries and their institutions. Users may opt to show/hide non-ministries, and include departments, public-law institutions, and data catalogs (e.g., mCLOUD) under their supervising ministry.

The dashboard is based on React. It uses the treemap chart from [Nivo](https://nivo.rocks), which is based, in turn, on d3.js. For testing, Jest is used in conjunction with testing-library. [Vite](https://vitejs.dev) is used for frontend tooling, in conjunction with [SWC](https://swc.rs) (Speedy Web Compiler).

## Online preview

You can view this dashboard online at [https://digitalservice-frontend-challenge-two.vercel.app](https://digitalservice-frontend-challenge-two.vercel.app).

## Installation

Yarn is used as the package manager. If not available, refer to the [installation instructions](https://yarnpkg.com/getting-started/install) to install it.

With `yarn` installed, run `yarn` to install project dependencies, and `yarn dev` to start the local development server. Follow the instructions in your terminal to view the application in your browser.

## Testing

To run logic and UI tests, run `yarn test`. Please note that the tests don't cover the complete dashboard.

## Next steps

- Check whether the dashboard answers the users' questions
- Expand test coverage
- Include a tabular or list view to make exploration easier (right now, it's hard to see small contributors)
- Add more comprehensive documentation
- Discuss integrating an API that provides information about department hierarchy
- Check consistency of data
- Improve styling
- Accessibility audit
- Performance optimizations
- Caching
- Error handling
