<template>
	<b-container fluid>
		<h1 class="mb-5">{{$t('content.user.title')}}</h1>
		<b-modal
		id="user-modal"
		centered
		:title="modalTitle"
	>
		<b-container fluid>
			<b-form-group
				:label="$t('content.user.username')"
				label-for="username"
			>
				<b-form-input 
					id="username"
					v-model="user.username"
					size="sm"
					:placeholder="$t('content.user.username')"
				></b-form-input>
			</b-form-group>
			<b-form-group
				:label="$t('content.user.password')"
				label-for="password"
			>
				<b-form-input 
					id="password"
					v-model="user.password"
					size="sm"
					type="password"
					:placeholder="$t('content.user.password')"
				></b-form-input>
			</b-form-group>
			<b-row>
				<b-col>
					<span v-if="success.create" class="pull-left text-success">
						{{$t('content.user.message.createSuccess')}}
					</span>
					<span v-if="error.create" class="pull-left text-danger">
						{{$t('content.user.message.createFailed')}}
					</span>
					<span v-if="success.update" class="pull-left text-success">
						{{$t('content.user.message.updateSuccess')}}
					</span>
					<span v-if="error.update" class="pull-left text-danger">
						{{$t('content.user.message.updateFailed')}}
					</span>
				</b-col>
			</b-row>
		</b-container>
		<div slot="modal-footer" class="w-100 text-right">
			<b-btn size="sm" v-if="createState" @click="reset">{{$t('content.user.reset')}}</b-btn>
			<b-btn size="sm" v-if="createState" variant="primary" @click="createUser">{{$t('content.user.create')}}</b-btn>
			<b-btn size="sm" v-else variant="primary" @click="updateUserById">{{$t('content.user.update')}}</b-btn>
		</div>
	</b-modal>
	<delete-modal
		:model-title="$t('content.user.deleteTitle')"
		:message="$t('content.user.deleteMsg')"
		@ok="deleteUser(deleteId)"
	></delete-modal>
		<b-row>
			<b-col>
				<b-btn v-b-modal.user-modal size="sm" variant="primary" @click="reset">{{$t('content.user.submit')}}</b-btn>
			</b-col>
			<b-col class="ml-auto" cols="auto">
				<b-pagination
					v-model="curPage"
					size="sm"
					:per-page="perPage"
					:total-rows="rows"
					aria-controls="users"
					algin="right"
				></b-pagination>
			</b-col>
		</b-row>
		<b-table
			ref="users"
			small
			hover
			:items="userList"
			:current-page="curPage"
			:per-page="perPage"
			:fields="[
				{ key: 'username', label: $t('content.user.username')},
				{ key: 'createdAt', label: $t('content.user.createdAt'), sortable: true},
				{ key: 'action', label: $t('content.user.action')}
			]"
		>
			<template slot="username" slot-scope="data">
				<b-btn
					v-b-modal.user-modal
					variant="link"
					@click="getUserById(data.item.id)"
				>{{ data.item.username }}</b-btn>
			</template>
			<template slot="createdAt" slot-scope="data">
				{{ format(data.item.createdAt) }}
			</template>
			<template slot="action" slot-scope="data">
				<i 
					v-b-modal.delete-item
					class="fa fa-trash fa-lg text-danger"
					aria-hidden="true"
					@click="getUserId(data.item.id)"
				></i>
			</template>
		</b-table>
	</b-container>
</template>

<script>
import DeleteModal from '../utils/DeleteModal.vue';

export default {
	components: { DeleteModal },
	data() {
		return {
			curPage: 1,
			perPage: 20,
			userList: [],
			user: {
				id: null,
				username: '',
				password: '',
			},
			createState: true,
			error: {
				create: false,
				update: false
			},
			success: {
				create: false,
				update: false
			},
			deleteId: null
		};
	},
	computed: {
		rows() {
			return this.userList.length;
		},
		modalTitle() {
			if(this.createState) {
				return '创建用户';
			}
			return '更新用户';
		}
	},
	mounted() {
		this.getUserList();
	},
	methods: {
		getUserList() {
			return this.$api.user.getList().then(res => {
				this.userList = res.data;
			});
		},
		createUser() {
			this.$api.user.create(this.user).then(() => {
				this.error.create = false;
				this.success.create = true;
				this.getUserList();
			}).catch(e => {
				if(e) {
					this.success.create = false;
					this.error.create = true;
				}
			});
		},
		getUserId(id) {
			this.deleteId = id;
		},
		getUserById(id) {
			this.reset();
			this.createState = false;
			this.success.update = false;
			return this.$api.user.get(id).then(res => {
				this.user.id = res.data.id;
				this.user.username = res.data.username;
				this.user.password = res.data.password;
			});
		},
		deleteUser(id) {
			return this.$api.user.delete(id).then(() => {
				this.getUserList();
				this.deleteId = null;
			}).catch(e => {
				console.log(e);
			});
		},
		updateUserById() {
			this.$api.user.update(this.user).then(() => {
				this.error.update = false;
				this.success.update = true;
				this.getUserList();
			}).catch(e => {
				if (e) {
					this.success.update = false;
					this.error.update = true;
				}
			});
		},
		reset() {
			this.user.id = null;
			this.user.username = '';
			this.user.password = '';
			this.createState = true;
			this.success.create = false;
			this.error.create = false;
		}
	}
};
</script>

