interface Properties {
  readonly getProperty: (key: string) => string | null
  readonly setProperty: (key: string, value: string) => void
}

declare interface PropertiesService {
  readonly getScriptProperties: () => Properties
  readonly getUserProperties: () => Properties
}

declare const PropertiesService: PropertiesService

declare interface Utilities {
  readonly getUuid: () => string
}

declare const Utilities: Utilities

declare interface OAuth2 {
  readonly createService: (serviceName: string) => Service
}

declare const OAuth2: OAuth2

declare interface Service {
  readonly setTokenUrl: (url: string) => Service
  readonly setPrivateKey: (privateKey: string) => Service
  readonly setClientId: (cid: string) => Service
  readonly setPropertyStore: (store: Properties) => Service
  readonly setScope: (scope: string | Array<string>) => Service
  readonly getAccessToken: () => string
  readonly hasAccess: () => boolean
  readonly getLastError: () => Error
}

declare interface UrlFetchApp {
  readonly fetch: (url: string, params: Record<string, unknown>) => HTTPResponse
}

declare const UrlFetchApp: UrlFetchApp

declare interface ServiceAccountCredentials {
  readonly private_key: string
  readonly client_id: string
}

declare const ServiceAccountCredentials: ServiceAccountCredentials

declare interface HTTPResponse {
  readonly getAllHeaders: () => Record<string, string>
  readonly getAs: (contentType: string) => Blob
  readonly getBlob: () => Blob
  readonly getContent: () => Byte[]
  readonly getContentText: (charset?: string) => string
  readonly getHeaders: () => Record<string, string>
  readonly getResponseCode: () => number
}
