/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	GroupMembers = "group_members",
	Groups = "groups",
	InviteLinks = "invite_links",
	Surveys = "surveys",
	Users = "users",
	Votes = "votes",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export enum GroupMembersRoleOptions {
	"admin" = "admin",
	"contributor" = "contributor",
}
export type GroupMembersRecord = {
	group_id: RecordIdString
	id: string
	joined_at?: IsoDateString
	role: GroupMembersRoleOptions
	updated?: IsoDateString
	user_id: RecordIdString
}

export type GroupsRecord = {
	created?: IsoDateString
	created_by: RecordIdString
	description?: string
	id: string
	name: string
	updated?: IsoDateString
}

export type InviteLinksRecord = {
	created?: IsoDateString
	created_by: RecordIdString
	group_id: RecordIdString
	id: string
	infinite?: boolean
	max_uses?: number
	updated?: IsoDateString
	uses?: number
}

export enum SurveysTypeOptions {
	"majority" = "majority",
	"score" = "score",
	"consensus" = "consensus",
}
export type SurveysRecord = {
	created?: IsoDateString
	created_by: RecordIdString
	created_in?: RecordIdString
	description?: string
	end_at: IsoDateString
	id: string
	start_at: IsoDateString
	title: string
	type: SurveysTypeOptions
	updated?: IsoDateString
}

export type UsersRecord = {
	created?: IsoDateString
	display_name: string
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type VotesRecord = {
	id: string
	pro?: boolean
	survey_id: RecordIdString
	updated?: IsoDateString
	user_id: RecordIdString
	voted_at?: IsoDateString
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type GroupMembersResponse<Texpand = unknown> = Required<GroupMembersRecord> & BaseSystemFields<Texpand>
export type GroupsResponse<Texpand = unknown> = Required<GroupsRecord> & BaseSystemFields<Texpand>
export type InviteLinksResponse<Texpand = unknown> = Required<InviteLinksRecord> & BaseSystemFields<Texpand>
export type SurveysResponse<Texpand = unknown> = Required<SurveysRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VotesResponse<Texpand = unknown> = Required<VotesRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	group_members: GroupMembersRecord
	groups: GroupsRecord
	invite_links: InviteLinksRecord
	surveys: SurveysRecord
	users: UsersRecord
	votes: VotesRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	group_members: GroupMembersResponse
	groups: GroupsResponse
	invite_links: InviteLinksResponse
	surveys: SurveysResponse
	users: UsersResponse
	votes: VotesResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'group_members'): RecordService<GroupMembersResponse>
	collection(idOrName: 'groups'): RecordService<GroupsResponse>
	collection(idOrName: 'invite_links'): RecordService<InviteLinksResponse>
	collection(idOrName: 'surveys'): RecordService<SurveysResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'votes'): RecordService<VotesResponse>
}
