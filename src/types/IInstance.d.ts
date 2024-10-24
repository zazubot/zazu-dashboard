export interface IInstance {
  id: string
  name: string
}

export interface IChatUser {
  id: number
  remoteJid: string
  createdAt: date
  updatedAt: date
  instanceId: number
}

export interface IMessageRecived {
  id: number
  keyId: string
  keyFromMe: boolean
  keyRemoteJid: string
  keyParticipant: ''
  pushName: string
  messageType: string
  content: string
  messageTimestamp: number
  instanceId: number
  device: 'ios' | 'android' | 'web' | 'unknown'
  MessageUpdate: []
}

export interface IContact {
  id?: number
  remoteJid?: string
  pushName: string | null
  profilePicUrl: string | null
  createdAt?: date
  updatedAt?: date
  instanceId?: number
}
