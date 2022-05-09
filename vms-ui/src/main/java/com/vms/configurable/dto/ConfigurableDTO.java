package com.vms.configurable.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class ConfigurableDTO implements Serializable {

    private long id;

    private Date createTime;

    private Date updateTime;

    private long version;
}