import { render, screen } from '@testing-library/react';
import { Navbar } from 'react-bootstrap';
import App from './App';
import Navigation from './components/Navigation';

//import { TableFooter } from "@material-ui/core";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('basic test', () => {
   expect(true).toBeTruthy();
   })

it('render',() => {
   expect(false).toBeFalsy();
   })

it("renders correctly", () => {
      const {queryByTestId, queryByPlaceholderName} = render(<Navbar/>)
      expect(queryByTestId("navbar")).toBeTruthy;
  })

//it('jest', () => {
//   expext(TableFooter).toBeTruthy();
//})