import { mount, shallowMount } from '@vue/test-utils'
import UserTable from '@/components/users/UserTable.vue';
import Button from '@/components/common/Button.vue'
describe('UserTable.vue', () => {
  it('renders user data when users are provided', () => {
    const users = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        dateOfBirth: '1990-01-01',
        position: 'Developer',
        country: 'USA',
        online: true,
      },
    ];

    const wrapper = shallowMount(UserTable, {
      propsData: { users },

    });

    expect(wrapper.findAll('tbody tr')).toHaveLength(1);
    expect(wrapper.find('.online-dot').exists()).toBe(true);
  });

  it('renders loading message when no users are provided', () => {
    const wrapper = shallowMount(UserTable, {
      propsData: { users: [] },
    });

    expect(wrapper.find('p').text()).toBe('Fetching your data!');
  });

  it('emits edit event when Edit button is clicked' , async () => {
    const users = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        dateOfBirth: '1990-01-01',
        position: 'Developer',
        country: 'USA',
        online: true,
      },
    ];

    const wrapper = mount(UserTable, {
      propsData: { users }
    });

    const editButton = wrapper.findAllComponents(Button);
    await editButton.at(0).trigger('click');
    expect(wrapper.emitted('edit')).toHaveLength(1);
    const firstInputValue = wrapper.emitted('edit')?.[ 0 ]?.[ 0 ] ?? null
    expect(firstInputValue).toEqual(users[ 0 ])
  });

  it('emits delete event when Remove button is clicked', () => {
    const users = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        dateOfBirth: '1990-01-01',
        position: 'Developer',
        country: 'USA',
        online: true,
      },
    ];

    const wrapper = mount(UserTable, {
      propsData: { users },
    });

    const deleteButton = wrapper.findAllComponents(Button);
    deleteButton.at(1).trigger('click');

    expect(wrapper.emitted('delete')).toHaveLength(1);
    const firstInputValue = wrapper.emitted('delete')?.[ 0 ]?.[ 0 ] ?? null
    expect(firstInputValue).toEqual(users[ 0 ])
  });
});
