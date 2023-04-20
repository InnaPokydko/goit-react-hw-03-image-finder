import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

const initialValues = {
  search: '',
};

const Searchbar = ({ onSubmit }) => {
  return (
    <header class="searchbar">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        <Form>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <Field
            name="search"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
