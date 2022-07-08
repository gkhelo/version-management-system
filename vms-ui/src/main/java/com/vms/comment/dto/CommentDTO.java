package com.vms.comment.dto;

import com.vms.configurable.dto.ConfigurableDTO;
import com.vms.user.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentDTO extends ConfigurableDTO {

	private long versionId;

	private UserDTO author;

	private String text;

	private Long parentId;

	private List<CommentDTO> replies;
}
