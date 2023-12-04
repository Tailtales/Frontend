import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Web3ReactProvider } from '@web3-react/core'
import Breeding from './pages/Breeding'
import DailyQuest from './pages/DailyQuest'
import LastRites from './pages/LastRites'
import Home from './pages/Home'
import Navbar from './components/NavBar'


const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function Layout() {


  return (
    <Suspense fallback={null}>
      <Route />
      <AppWrapper>
        <HeaderWrapper>
            <Navbar />
        </HeaderWrapper>
        <BodyWrapper>
            <Web3ReactProvider getLibrary={web3 => web3}>
              <Switch>
                <Route exact strict path="/" component={Home} />
                <Route exact strict path="/breeding" component={Breeding} />
                <Route exact strict path="/dailyQuests" component={DailyQuest} />
                <Route exact strict path="/lastRites" component={LastRites} />
                <Redirect to="/" />
              </Switch>
            </Web3ReactProvider>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}
