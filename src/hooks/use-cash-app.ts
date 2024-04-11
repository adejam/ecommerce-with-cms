import { useEffect, useState } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import {
  AccountMeta,
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"
import { getAvatarUrl } from "@/lib/utils"
import BigNumber from "bignumber.js"

const useCashApp = () => {
  const [avatar, setAvatar] = useState("")
  const [userAddress, setUserAddress] = useState("")
  const [amount, setAmount] = useState(0)
  const [reciever, setReciever] = useState("")
  const [transactionPurpose, setTransactionPurpose] = useState("")
  const { connected, publicKey, connecting, sendTransaction } = useWallet()
  const { connection } = useConnection()

  const makeTransaction = async (
    fromWallet: PublicKey,
    toWallet: PublicKey,
    amount: BigNumber,
    reference: PublicKey
  ) => {
    // const network = WalletAdapterNetwork.Devnet
    // const endpoint = clusterApiUrl(network)
    // const connection = new Connection(endpoint)

    // Get a recent blockhash to include in the transaction
    const { blockhash } = await connection.getLatestBlockhash("finalized")
    const transaction = new Transaction({
      recentBlockhash: blockhash,
      // The buyer pays transaction fee
      feePayer: fromWallet,
    })

    // instruction to send SOL from buyer to recoiever
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: fromWallet,
      // when u have naira... the small unit is kobo... lamports the the small unit for SOL currency
      lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
      toPubkey: toWallet,
    })

    // this is so that when we query from the reference the transaction is returned
    transferInstruction.keys.push({
      pubkey: reference,
      isSigner: false,
      isWritable: false,
    })

    transaction.add(transferInstruction)

    return transaction
  }

  const doTransaction = async ({
    amount,
    reciever,
    transactionPurpose,
  }: {
    amount: number
    reciever: string
    transactionPurpose: string
  }) => {
    if (!publicKey) {
      alert("Please connect your wallet!")
      return
    }
    const fromWallet = publicKey
    const toWallet = new PublicKey(reciever)
    const bnAmount = new BigNumber(amount)
    const reference = Keypair.generate().publicKey
    const transaction = await makeTransaction(
      fromWallet,
      toWallet,
      bnAmount,
      reference
    )
    const transactionHash = await sendTransaction(transaction, connection)
  }

  useEffect(() => {
    if (connected && publicKey) {
      setAvatar(getAvatarUrl(publicKey.toString()))
      setUserAddress(publicKey.toString())
    }
  }, [connected])

  return {
    connected,
    publicKey,
    connecting,
    avatar,
    userAddress,
    amount,
    setAmount,
    doTransaction,
    reciever,
    setReciever,
    transactionPurpose,
    setTransactionPurpose,
  }
}

export default useCashApp
