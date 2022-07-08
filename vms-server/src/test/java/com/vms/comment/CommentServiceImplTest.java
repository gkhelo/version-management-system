package com.vms.comment;

import com.vms.comment.repository.CommentRepository;
import com.vms.exceptions.VMSException;
import com.vms.model.version.Comment;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.AdditionalAnswers.returnsFirstArg;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CommentServiceImplTest {

	private static final Sort SORT = Sort.by("createTime");

	@Mock
	private CommentRepository commentRepository;

	@InjectMocks
	private CommentServiceImpl service;

	@Test
	public void test_empty_comments() {
		when(commentRepository.findByAppVersionIdAndParentIsNull(1L, SORT)).thenReturn(Collections.emptyList());

		List<Comment> comments = service.getVersionComments(1L);
		assertTrue(comments.isEmpty());
	}

	@Test
	public void test_getVersionComments() {
		List<Comment> comments = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			Comment comment = new Comment();
			comment.setId(i);
			comment.setText("text" + i);

			comments.add(comment);
		}
		when(commentRepository.findByAppVersionIdAndParentIsNull(1L, SORT)).thenReturn(comments);

		List<Comment> actual = service.getVersionComments(1L);

		assertEquals(comments.size(), actual.size());
		for (int i = 0; i < 5; i++) {
			Comment comment = actual.get(i);
			assertEquals(i, comment.getId());
			assertEquals("text" + i, comment.getText());
		}
	}

	@Test
	public void test_get_comment_when_id_not_exists() {
		when(commentRepository.findById(1L)).thenReturn(Optional.empty());

		assertNull(service.getComment(1L));
	}

	@Test
	public void test_get_comment() {
		Comment comment = new Comment();
		comment.setId(1L);
		comment.setText("Text");

		when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));

		Comment actual = service.getComment(1L);
		assertEquals(comment.getId(), actual.getId());
		assertEquals(comment.getText(), actual.getText());
	}

	@Test
	public void test_update_comment_when_not_exists() {
		when(commentRepository.findById(1L)).thenReturn(Optional.empty());

		VMSException exception = assertThrows(VMSException.class, () -> service.updateComment(1L, "test"));
		assertEquals("Comment with id 1 does not exist", exception.getMessage());
	}

	@Test
	public void test_update_comment() {
		Comment comment = new Comment();
		comment.setId(1L);
		comment.setText("Text");

		when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
		when(commentRepository.save(any())).thenAnswer(returnsFirstArg());

		Comment actual = service.updateComment(1L, "changed");
		assertEquals(comment.getId(), actual.getId());
		assertEquals("changed", actual.getText());
	}

	@Test
	public void test_delete_comment_when_not_exists() {
		when(commentRepository.findById(1L)).thenReturn(Optional.empty());

		VMSException exception = assertThrows(VMSException.class, () -> service.deleteComment(1L));
		assertEquals("Comment with id 1 does not exist", exception.getMessage());
	}

	@Test
	public void test_delete_comment() {
		Comment parent = new Comment();
		parent.setId(1L);

		Comment comment = new Comment();
		comment.setId(2L);
		comment.setText("Text");

		comment.setParent(parent);
		parent.getReplies().add(comment);

		when(commentRepository.findById(2L)).thenReturn(Optional.of(comment));
		when(commentRepository.save(any())).thenAnswer(returnsFirstArg());

		service.deleteComment(2L);
		assertTrue(parent.getReplies().isEmpty());
	}
}
