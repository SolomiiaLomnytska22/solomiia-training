import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import Users from '@/Users.vue';
import axios from 'axios';
import UserTable from '@/components/users/UserTable.vue'
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue'

jest.mock('axios', () => ({
  get: jest.fn(),
  delete: jest.fn(),
}));

const localVue = createLocalVue();

describe('Users.vue', () => {
  let wrapper: Wrapper<Vue>;

  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ status: 200, data: [] });
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({ status: 200 });

    wrapper = mount(Users, {
      localVue,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('fetches data on mount', async () => {
    await wrapper.vm.$nextTick();
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users');
    expect((wrapper.vm as any).users).toEqual([]);
  });

  it('opens UserInfoModal when Add button is clicked', async () => {
    await wrapper.find('.heading Button').trigger('click');
    expect((wrapper.vm as any).showUserInfoModal).toBe(true);
    expect((wrapper.vm as any).selectedUser).toBeNull();
  });

  it('opens UserInfoModal when Edit button is clicked', async () => {
    const usersData = [ { id: 1, name: 'John', surname: 'Doe' } ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ status: 200, data: usersData });

    await (wrapper.vm as any).getData();
    wrapper.findComponent(UserTable).vm.$emit('edit', usersData[ 0 ]);
    expect((wrapper.vm as any).showUserInfoModal).toBe(true);
    expect((wrapper.vm as any).selectedUser).toEqual(usersData[ 0 ]);
  });

  it('opens ConfirmationDialog when Delete button is clicked', async () => {
    const usersData = [ { id: 1, name: 'John', surname: 'Doe' } ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ status: 200, data: usersData });

    await (wrapper.vm as any).getData();

    wrapper.findComponent(UserTable).vm.$emit('delete', usersData[ 0 ]);
    expect((wrapper.vm as any).showConfirmation).toBe(true);
    expect((wrapper.vm as any).selectedUser).toEqual(usersData[ 0 ]);
  });

  it('deletes user when confirmation is confirmed', async () => {
    const selectedUser = { id: 1, name: 'John', surname: 'Doe' };
    await wrapper.setData({ selectedUser, showConfirmation: true });

    wrapper.findComponent(ConfirmationDialog).vm.$emit('confirm');

    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/users/${selectedUser.id}`);
    expect((wrapper.vm as any).showConfirmation).toBe(false);
    expect((wrapper.vm as any).selectedUser).toBeNull();
  });

  it('handles errors when deleting user', async () => {
    window.alert = jest.fn();
    const alertSpy = jest.spyOn(window, 'alert');
    const selectedUser = { id: 1, name: 'John', surname: 'Doe' };
    await wrapper.setData({ selectedUser, showConfirmation: true });

    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockRejectedValueOnce(new Error('Delete error'));

    await wrapper.findComponent(ConfirmationDialog).vm.$emit('confirm');
    await wrapper.vm.$nextTick();

    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/users/${selectedUser.id}`);
    expect((wrapper.vm as any).showConfirmation).toBe(false);
    expect((wrapper.vm as any).selectedUser).toBeNull();

    expect(alertSpy).toHaveBeenCalled();

    alertSpy.mockRestore();
  });


});

