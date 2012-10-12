# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts 'SETTING UP DEFAULT USER LOGIN'
user = User.create!\
:name => 'foo',\
:email => 'foo@scauhci.org',\
:password => 'foobar',\
:student_id => '201030720501',\
:mobile => '13433361522',\
:admin => true,\
:inspects => [\
              {\
                :content => 'what',\
                :opinions => [\
                              {\
                                :content => 'but'\
                              },\
                              {\
                                :content => 'that'\
                              }\
                             ]\
              },{\
                :content => 'how',\
                :opinions => [\
                              {\
                                :content => 'but'\
                              },\
                              {\
                                :content => 'that'\
                              }\
                             ]\
              }\
             ]
puts 'New user created: ' << user.name
user2 = User.create!\
:name => 'bar',\
:email => 'bar@scauhci.org',\
:password => 'foobar',\
:student_id => '201030720502',\
:mobile => '13433361511',\
:admin => true,\
:inspects => [\
              {\
                :content => 'what',\
                :creator_id => user.id,\
                :opinions => [\
                              {\
                                :content => 'but',\
                                :creator_id => user.id\
                              },\
                              {\
                                :content => 'but',\
                                :creator_id => user.id\
                              }\
                             ]\
              },{\
                :content => 'how',\
                :creator_id => user.id,\
                :opinions => [\
                              {\
                                :content => 'but',\
                                :creator_id => user.id\
                              },\
                              {\
                                :content => 'but',\
                                :creator_id => user.id\
                              }\
                             ]\
              }\
             ]
puts 'New user created: ' << user2.name
