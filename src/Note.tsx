import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import { FiArrowLeft, FiDownload, FiEdit, FiTrash2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { useNote } from './NoteLayout';

type NoteProps = {
	onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
	const note = useNote();
	const navigate = useNavigate();

	return (
		<>
			<Row className='align-items-center mb-4'>
				<Col>
					<h1>{note.title}</h1>
					{note.tags.length > 0 && (
						<Stack gap={1} direction='horizontal' className='flex-wrap'>
							{note.tags.map((tag) => (
								<Badge className='text-truncate' key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Col>
				<Col xs='auto'>
					<Stack gap={2} direction='horizontal'>
						<Link to={`/${note.id}/edit`}>
							<Button variant='primary'>
								<FiEdit />
							</Button>
						</Link>
						<Button
							onClick={() => {
								// Download the note as a markdown file
								const element = document.createElement('a');
								const file = new Blob([note.markdown], {
									type: 'text/markdown',
								});
								element.href = URL.createObjectURL(file);
								element.download = `${note.title}.md`;
								document.body.appendChild(element);
								element.click();
							}}
							variant='outline-warning'
						>
							<FiDownload />
						</Button>
						<Button
							onClick={() => {
								onDelete(note.id);
								navigate('/');
							}}
							variant='outline-danger'
						>
							<FiTrash2 />
						</Button>
						<Link to='/'>
							<Button variant='outline-secondary'>
								<FiArrowLeft />
							</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<hr />
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{note.markdown}</ReactMarkdown>
		</>
	);
}
