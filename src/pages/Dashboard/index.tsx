import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ListTool } from '../../shared/components';
import {LayoutBasePage} from '../../shared/layouts';
import { CityService } from '../../shared/services/api/CityService';
import { PersonService } from '../../shared/services/api/PersonService';

export const Dashboard: React.FC = () => {

  const [isLoadingCities,setIsLoadingCities] = useState(false);
  const [isLoadingPersons,setIsLoadingPersons] = useState(true);
  const [totalCountCities,setTotalCountCities] = useState(0);
  const [totalCountPerson,setTotalCountPerson] = useState(0);
    

  useEffect(()=>{
    setIsLoadingCities(true);
    setIsLoadingPersons(true);
   
    CityService.getAll(1)
        .then(result=>{
            if(result instanceof Error){
                alert(result.message);
            }else{
                setTotalCountCities(result.totalCount);
            }
        }).finally(()=>{
            setIsLoadingCities(false);
        });    

    PersonService.getAll(1)
        .then(result=>{
            if(result instanceof Error){
                alert(result.message);
            }else{
                setTotalCountPerson(result.totalCount);
            }
        }).finally(()=>{
          setIsLoadingPersons(false);
        });    
    },[]);

  return (
      <LayoutBasePage 
        title='Página Inicial' 
        toolbar={<ListTool isNewButtonVisible={false}  />} 
        
        >
        <Box width="100%" display='flex'>
          <Grid container margin={1} >
            <Grid item container spacing={2} >
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" align='center' >
                      Total de Pessoas
                    </Typography>
                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                    {
                        !isLoadingPersons && (
                          <Typography variant="h1" >
                            {totalCountPerson}
                          </Typography>
                        )}
                      {
                        isLoadingPersons && (
                          <Typography variant="h6" >
                              Carregando...
                          </Typography>
                        )
                      }
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card>
                  <CardContent>
                    <Typography variant="h5" align='center' >
                      Total de cidades
                    </Typography>
                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                    {
                        !isLoadingCities && (
                          <Typography variant="h1" >
                            {totalCountCities}
                          </Typography>
                        )}
                      {
                        isLoadingCities && (
                          <Typography variant="h6" >
                              Carregando...
                          </Typography>
                        )
                      }
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </LayoutBasePage>

  );
}