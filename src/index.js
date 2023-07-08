// Import blaze-runtime
import "meteor-blaze-runtime";

// Import stylesheets bootstrap and base
import 'bootstrap/dist/css/bootstrap.css'
import './Engine/Stylesheets/base.css';

// Import engine
import Engine from './Engine/Engine';

// Start engine
const engine = new Engine();


// test
// import './Engine/BlazeTemplates/test';

// Blaze.renderWithData(Template.test, {}, document.getElementsByTagName("body")[0]);