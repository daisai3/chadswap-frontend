import { useCallback, useEffect, useState } from 'react'

import { provider } from 'web3-core'
import useSushi from './useSushi'

import { useWallet } from 'use-wallet'

import {getCherryPopAmount, getCherryPopRewardPercent, getSushiContract} from '../sushi/utils'

import BigNumber from 'bignumber.js'

const usePopCherryAmount = () => {

  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
 
  const sushi = useSushi()

  const [popCherryAmount, setPopCherryAmount] = useState(new BigNumber(0))
  const [popCherryBurnRewardPct, setPopCherryBurnRewardPct] = useState(0)

  const sushiContract = getSushiContract(sushi)

  const fetchPopCherryAmount = useCallback(async () => {
    const t = await getCherryPopAmount(getSushiContract(sushi)) 
    setPopCherryAmount(new BigNumber(t) )
    const r = await getCherryPopRewardPercent(getSushiContract(sushi))
    setPopCherryBurnRewardPct(r/100.0)
    console.log('reward pct', popCherryBurnRewardPct)
  }, [popCherryBurnRewardPct, sushi])

  useEffect(() => {
    if (account && ethereum && sushi && sushiContract) {
      fetchPopCherryAmount()
    }    
  }, [account, ethereum, fetchPopCherryAmount, sushi, sushiContract])

  return { popCherryAmount: popCherryAmount, popCherryBurnRewardPct: popCherryBurnRewardPct} ;
}

export default usePopCherryAmount
