import * as fcl from "@onflow/fcl"
import {yup, nope} from "../util"
import {AppUtils} from "@onflow/fcl"

const serviceOfType = (services = [], type) => {
  return services.find(service => service.type === type)
}

export const LABEL = "Log In"
export const CMD = async () => {
  // prettier-ignore
  const res = await fcl
    .reauthenticate()
    .then(yup("US-1"))
    .then(res => res)
    .catch(nope("US-1"))

  if (typeof res === "string") return
  const acctProof = serviceOfType(res.services, "account-proof")
  if (acctProof) {
    return await AppUtils.verifyAccountProof(
      acctProof.data.appIdentifier,
      acctProof.data
    ).then(r => console.log("verified", r))
  }
}
