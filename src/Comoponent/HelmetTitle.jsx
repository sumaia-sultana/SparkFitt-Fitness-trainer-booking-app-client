 
import { Helmet } from 'react-helmet';

const HelmetTitle = ({ title }) => {
    return (
        <Helmet>
      <title>SparkFit | {title}</title>
    </Helmet>
    );
};

export default HelmetTitle;