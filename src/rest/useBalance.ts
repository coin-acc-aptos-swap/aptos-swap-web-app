import { useEffect, useState } from "react"
import { useContractsAddress } from "hooks/useContractsAddress"
import { useAddress } from "../hooks"
import useAPI from "./useAPI"

export default (contract_addr: string, symbol: string) => {
  const address = useAddress()
  const { getSymbol } = useContractsAddress()

  const { loadDenomBalance, loadContractBalance } = useAPI()

  const localContractAddr = contract_addr
  const localSymbol = symbol

  const [balance, setBalance] = useState<string>()
  useEffect(() => {
    try {
      if (address === "" || address === undefined) {
        setBalance("")
        return
      }
      if (
        localContractAddr === "" ||
        localContractAddr === undefined ||
        !localContractAddr.startsWith("terra")
      ) {
        loadDenomBalance().then((denomInfos) => {
          let hasDenom: boolean = false
          if (denomInfos !== undefined) {
            denomInfos.forEach((denomInfo) => {
              if (denomInfo.denom === localContractAddr) {
                setBalance(denomInfo.amount)
                hasDenom = true
              }
            })
          }
          if (hasDenom === false) {
            setBalance("")
          }
        })
      } else {
        loadContractBalance(localContractAddr).then((tokenBalance) => {
          tokenBalance ? setBalance(tokenBalance.balance) : setBalance("")
        })
      }
    } catch (error) {
      setBalance("")
    }
  }, [
    address,
    contract_addr,
    getSymbol,
    loadContractBalance,
    loadDenomBalance,
    localContractAddr,
    localSymbol,
    symbol,
  ])

  return { balance }
}
