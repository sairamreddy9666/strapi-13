import React from 'react';
import { useFlag } from '@unleash/proxy-client-react';

const FeatureComponent: React.FC = () => {
  const isNewFeatureEnabled = useFlag('new-feature'); // Replace with your flag name

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>🎯 Unleash Feature Flag Demo</h2>
      {isNewFeatureEnabled ? (
        <p style={{ color: 'green' }}>🚀 New Feature is ENABLED!</p>
      ) : (
        <p style={{ color: 'gray' }}>🧱 Old Feature is displayed.</p>
      )}
    </div>
  );
};

export default FeatureComponent;

