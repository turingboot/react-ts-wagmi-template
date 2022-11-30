import React, { useState } from "react";
import { utils } from 'ethers'
import { useDebounce } from 'use-debounce'
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from "wagmi";


export function SendTransaction() {

  const [to, setTo] = useState('')
  const [debouncedTo] = useDebounce(to, 500)

  const [amount, setAmount] = useState('')
  const [debouncedValue] = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedValue ? utils.parseEther(debouncedValue) : undefined,
    },
  })

  const { data, sendTransaction } = useSendTransaction(config)


  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  
  const [isSuccessSign,setIsSuccessSign] = useState(false)

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      sendTransaction?.()
    }}
    >
      <input aria-label="Recipient" placeholder="0xA0Cf…251e"
        onChange={(e) => setTo(e.target.value)} value={to} />
      <input aria-label="Amount (ether)" placeholder="0.05"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <button disabled={isLoading || !sendTransaction || !to || !amount}>
        {isLoading ? 'Sending' : 'Send'}
      </button>
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  )
}


