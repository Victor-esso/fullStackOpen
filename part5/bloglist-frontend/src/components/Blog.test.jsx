import { render , screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { beforeEach, describe, expect, test } from 'vitest'

describe('<Blog /> ', () => {
	const dummyFunction = vi.fn()
	test('renders content', () => {
		const blog = {
			title : 'This is a test title',
			author : 'dan Jenkins',
			url : 'https://test.com',
			likes : 7,
			owner : true
		}
	
		render(<Blog blog={ blog } setBlogs={dummyFunction} />)
		const element = screen.getByText('This is a test title')
		screen.debug(element)
		expect(element).toBeDefined()
	})
	
	test('renders content -using css selector to check', () => {
		const blog = {
			title : 'This is a test title',
			author : 'dan Jenkins',
			url : 'https://test.com',
			likes : 7,
			owner : true
		}
	
		const { container } = render(<Blog blog={ blog } setBlogs={dummyFunction} />)
		const div = container.querySelector('.blog')
		expect(div).toHaveTextContent('This is a test title')
	})
	
	test('clicking the button calls event handler once', async () => {
		const blog = {
			title : 'This is a test title',
			author : 'dan Jenkins',
			url : 'https://test.com',
			likes : 7,
			owner : true
		}
	
		const mockHandler = vi.fn() // this is just random function that we passed to the rendered component
		render(
			<Blog blog={ blog } setBlogs={dummyFunction} clickTest={mockHandler} />
		)
	
		const user = userEvent.setup() //Start user session
		const button = screen.getByText('Show')
		screen.debug(button)
		await user.click(button)
	
		expect(mockHandler.mock.calls).toHaveLength(1)
	})
})

describe('<Togglable />', () => { 
	let container
	beforeEach(() => {
		container = render(
			<Togglable toggleLabel='Show' >
				<div className='testDiv'>togglable content</div>
			</Togglable>
		).container
	})

	test('renders its children', async () => {
		await screen.findAllByText('togglable content')
	})

	test('at start the children are not displayed' , () => {
		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

	test('after clicking the button , children are displayed' , async () => {
		const user = userEvent.setup()
		const button = screen.getByText('Show')
		await user.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('toggled content can be closed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('Show')
		await user.click(button)
	
		const closeButton = screen.getByText('Cancel')
		await user.click(closeButton)
	
		const div = container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

 })
 
describe('<CreateBlog />' , () => {
	test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
		const createNote = vi.fn()
		const dummyFunction = vi.fn()
		const user = userEvent.setup()
		
		const { container } = render(
			<CreateBlog 
				setBlogs={dummyFunction} 
				setSuccessMessage={dummyFunction} 
				setErrorMessage={dummyFunction} 
				closePostForm={dummyFunction}
				textFunc={createNote}
			/>
		)
		
		const titleInput = container.querySelector('[name="title"]')
		const authorInput = container.querySelector('[name="author"]')
		const urlInput = container.querySelector('[name="url"]')
		const sendButton = screen.getByText('Create')
		
		await user.type(titleInput, 'directly from test file')
		await user.type(authorInput, 'test File')
		await user.type(urlInput, 'https://testfile.com')
		await user.click(sendButton)
		console.log(createNote.mock.calls)
		
		expect(createNote.mock.calls).toHaveLength(1)
		expect(createNote.mock.calls[0][0].author).toBe('test File')
	})
})