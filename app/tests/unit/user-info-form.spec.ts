import { mount, createLocalVue, Wrapper } from '@vue/test-utils';
import UserInfoForm from '@/components/users/UserInfoForm.vue';
import axios from 'axios';

jest.mock('axios', () => ({
  post: jest.fn(),
  put: jest.fn(),
}));

const localVue = createLocalVue();

describe('UserInfoForm.vue', () => {
  let wrapper: Wrapper<Vue>;
  window.alert = jest.fn();

  beforeEach(() => {
    wrapper = mount(UserInfoForm, {
      localVue,
      propsData: {
        action: 'add',
        selectedUser: null,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders form elements correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('emits "close" event when close button is clicked', async () => {
    await wrapper.find('.secondary').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('calls the correct method when form is submitted', async () => {
    const spy = jest.spyOn(wrapper.vm as any, 'addUser');
    await wrapper.find('form').trigger('submit.prevent');
    expect(spy).toHaveBeenCalled();
  });

  it('adds user when form is submitted for "add" action', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({ status: 201, data: {} });
    wrapper.setData({
      newUserData: {
        id: null,
        name: 'John',
        surname: 'Doe',
        dateOfBirth: '1990-01-01',
        position: 'Developer',
        country: 'USA',
        online: false,
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('data-saved')).toBeTruthy();
    expect(wrapper.emitted('close')).toBeTruthy();
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users', {
      id: null,
      name: 'John',
      surname: 'Doe',
      dateOfBirth: '1990-01-01',
      position: 'Developer',
      country: 'USA',
      online: false,
    });
    expect((wrapper.vm as any).selectedUser).toBeNull();
  });

  it('edits user when form is submitted for "edit" action', async () => {

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValueOnce({ status: 200, data: {} });
    const editWrapper = mount(UserInfoForm, {
      propsData: {
        action: 'edit',
        selectedUser: {
          id: 1,
          name: 'John',
          surname: 'Doe',
          dateOfBirth: '1990-01-01',
          position: 'Developer',
          country: 'USA',
          online: false,
        },
      },
    });

    editWrapper.setData({
      newUserData: {
        id: 1,
        name: 'Updated John',
        surname: 'Updated Doe',
        dateOfBirth: '1990-01-01',
        position: 'Updated Developer',
        country: 'USA',
        online: false,
      },
    });

    await editWrapper.find('form').trigger('submit.prevent');

    expect(editWrapper.emitted('data-saved')).toBeTruthy();
    expect(editWrapper.emitted('close')).toBeTruthy();

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/users/1', {
      id: 1,
      name: 'Updated John',
      surname: 'Updated Doe',
      dateOfBirth: '1990-01-01',
      position: 'Updated Developer',
      country: 'USA',
      online: false,
    });

    expect(editWrapper.emitted('data-saved')).toBeTruthy();
    expect(editWrapper.emitted('show-toast')).toBeTruthy();
    expect(editWrapper.emitted('show-toast')![ 0 ]).toEqual([ 'Successfully edited user.', 'success' ]);
  });

  it('handles errors when adding user', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(new Error('Add user error'));

    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/users', expect.any(Object));

    expect(wrapper.emitted('data-saved')).toBeUndefined();
    expect(wrapper.emitted('close')).toBeUndefined();
    expect(wrapper.emitted('show-toast')).toBeTruthy();
    expect(wrapper.emitted('show-toast')![ 0 ]).toEqual([ 'An error occurred while adding user.', 'danger' ]);

  });

  it('handles errors when saving user', async () => {
    const editWrapper = mount(UserInfoForm, {
      propsData: {
        action: 'edit',
        selectedUser: {
          id: 1,
          name: 'John',
          surname: 'Doe',
          dateOfBirth: '1990-01-01',
          position: 'Developer',
          country: 'USA',
          online: false,
        },
      },
    });

    editWrapper.setData({
      newUserData: {
        id: 1,
        name: 'Updated John',
        surname: 'Updated Doe',
        dateOfBirth: '1990-01-01',
        position: 'Updated Developer',
        country: 'USA',
        online: false,
      },
    });

    (axios.put as jest.MockedFunction<typeof axios.put>).mockRejectedValueOnce(new Error('Save user error'));

    await editWrapper.find('form').trigger('submit.prevent');
    await editWrapper.vm.$nextTick();

    expect(axios.put).toHaveBeenCalledWith(`http://localhost:3000/users/${(editWrapper.vm as any).selectedUser.id}`, expect.any(Object));

    expect(editWrapper.emitted('data-saved')).toBeUndefined();
    expect(editWrapper.emitted('close')).toBeUndefined();
    expect(editWrapper.emitted('show-toast')).toBeTruthy();
    expect(editWrapper.emitted('show-toast')![ 0 ]).toEqual([ 'An error occurred while editing user.', 'danger' ]);
  });
});
