import React from 'react';
import { ListTool } from '../../shared/components';
import {LayoutBasePage} from '../../shared/layouts';

export const Dashboard: React.FC = () => {
  return (
      <LayoutBasePage 
        title='Página Inicial' 
        toolbar={<ListTool isSearchInputVisible isNewButtonVisible />} >
          Testando....
      </LayoutBasePage>

  );
}